package controllers

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
	"log"
	"net/http"
)

var db *sql.DB

type Student struct {
	Roll_no    string `json:"rollNumber"`
	First_name string `json:"firstName"`
	Last_name  string `json:"lastName"`
	Email      string `json:"email"`
	Gender     string `json:"gender"`
	Contact_no string `json:"contactNumber"`
	Password   string `json:"password"`
}

type FormResponse struct {
	Roll_no           string `json:"rollNumber"`
	Question_id       int    `json:"questionID"`
	Question_response string `json:"questionResponse"`
}

func LoginHandler(c *gin.Context) {
	var loginDetails Student

	if err := c.BindJSON(&loginDetails); err != nil {
		err := fmt.Errorf("loginHandler %v", err)
		fmt.Println(err)
		return
	}

	if loginDetails.Password == "1234" {
		token := "dummy_token"
		c.JSON(http.StatusOK, gin.H{"token": token})
	} else {
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
	}
}

func DbConnect() {
	cfg := mysql.Config{
		User:                 "root",
		Passwd:               "1234",
		Net:                  "tcp",
		Addr:                 "127.0.0.1:3306",
		DBName:               "mental_health",
		AllowNativePasswords: true,
	}

	var err error
	db, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}

	pingErr := db.Ping()

	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected to DB!")
}

func GetStudents(c *gin.Context) {
	rows, err := db.Query("SELECT * FROM student")
	if err != nil {
		err := fmt.Errorf("getStudents %v", err)
		fmt.Println(err)
		return
	}
	defer rows.Close()

	var students []Student
	for rows.Next() {
		var student Student
		err := rows.Scan(&student.Roll_no, &student.First_name, &student.Last_name, &student.Email, &student.Gender, &student.Contact_no)
		if err != nil {
			err := fmt.Errorf("getStudents %v", err)
			fmt.Println(err)
			return
		}
		students = append(students, student)

	}
	c.IndentedJSON(http.StatusOK, students)
}

func AddStudent(c *gin.Context) {
	var newStudent Student

	if err := c.BindJSON(&newStudent); err != nil {
		err := fmt.Errorf("addStudent %v", err)
		fmt.Println(err)
		return
	}

	res, err := db.Exec("INSERT INTO student VALUES (?, ?, ?, ?, ?, ?, ?)", newStudent.Roll_no, newStudent.First_name, newStudent.Last_name, newStudent.Email, newStudent.Gender, newStudent.Contact_no, newStudent.Password)

	if err != nil {
		err := fmt.Errorf("addStudent %v", err)
		fmt.Println(err)
		return
	}

	id, err := res.LastInsertId()

	if err != nil {
		err := fmt.Errorf("addStudent %v", err)
		fmt.Println(err)
		return
	}

	fmt.Println(id)
	c.IndentedJSON(http.StatusCreated, newStudent)
}

func GetFormResponses(c *gin.Context) {
	rows, err := db.Query("SELECT * FROM form_response ORDER by question_id")
	if err != nil {
		err := fmt.Errorf("getFormResponses %v", err)
		fmt.Println(err)
		return
	}
	defer rows.Close()

	// send response in the following format:
	/*
		array of objects where each object has the following format:
			{ rollNumber: 1, question1: 4, question2: 3, question3: 5 }
	*/

	var formResponses []FormResponse
	for rows.Next() {
		var formResponse FormResponse
		err := rows.Scan(&formResponse.Roll_no, &formResponse.Question_id, &formResponse.Question_response)
		if err != nil {
			err := fmt.Errorf("getFormResponses %v", err)
			fmt.Println(err)
			return
		}
		formResponses = append(formResponses, formResponse)

	}

	// group by rollNumber
	var groupedFormResponses = make(map[string]map[int]string)
	for _, formResponse := range formResponses {
		if groupedFormResponses[formResponse.Roll_no] == nil {
			groupedFormResponses[formResponse.Roll_no] = make(map[int]string)
		}
		groupedFormResponses[formResponse.Roll_no][formResponse.Question_id] = formResponse.Question_response
	}

	var result []map[string]interface{}

	for rollNumber, responses := range groupedFormResponses {
		entry := make(map[string]interface{})

		// Assign rollNumber first
		entry["rollNumber"] = rollNumber

		// Assign question responses
		for questionID, questionResponse := range responses {
			entry[fmt.Sprintf("%d", questionID)] = questionResponse
		}

		result = append(result, entry)
	}

	fmt.Println(groupedFormResponses)

	c.IndentedJSON(http.StatusOK, result)

}

func AddFormResponse(c *gin.Context) {
	var newFormResponse FormResponse

	if err := c.BindJSON(&newFormResponse); err != nil {
		err := fmt.Errorf("addFormResponse %v", err)
		fmt.Println(err)
		return
	}

	res, err := db.Exec("INSERT INTO form_response VALUES (?, ?, ?)", newFormResponse.Roll_no, newFormResponse.Question_id, newFormResponse.Question_response)

	if err != nil {
		err := fmt.Errorf("addFormResponse %v", err)
		fmt.Println(err)
		return
	}

	id, err := res.LastInsertId()

	if err != nil {
		err := fmt.Errorf("addFormResponse %v", err)
		fmt.Println(err)
		return
	}

	fmt.Println(id)
	c.IndentedJSON(http.StatusCreated, newFormResponse)
}
