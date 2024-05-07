package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Use(cors.Default())

	r.POST("/student-register")
	r.GET("/students", controllers.GetStudents)
	r.POST("/form-response", controllers.AddFormResponse)
	r.GET("/form-response", controllers.GetFormResponses)
	r.POST("/login", controllers.LoginHandler)
	return r
}
