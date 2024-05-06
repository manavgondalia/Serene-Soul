package main

import (
	"database/sql"
	"fmt"
	"github.com/gin-contrib/cors"
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
	Question_id       string `json:"questionID"`
	Question_response string `json:"questionResponse"`
}

func dbConnect() {
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

func getStudents(c *gin.Context) {
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

func addStudent(c *gin.Context) {
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

func addFormResponse(c *gin.Context) {
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

func main() {
	dbConnect()

	router := gin.Default()
	router.Use(cors.Default())

	router.POST("/student-register", addStudent)
	router.GET("/students", getStudents)
	router.POST("/form-response", addFormResponse)

	router.Run("localhost:8080")
}
