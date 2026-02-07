import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
    definition : {
        openapi : "3.0.0",
        info : {
            title : "SaaS Platform API",
            version : "1.0.0",
            description : "API documentation for the SaaS platform",
        },
        servers :[
            {
                url : "http://localhost:5000/api", description : "Local",
            }
        ],
        components: {
            securitySchemes : {
                bearerAuth:{
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                }
            }
        },
        security:[{bearerAuth : [] }],
    },
    apis : ["./src/routes/*.js", "./src/models/*.js"],  // auto-scan route files
})