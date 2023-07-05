import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './config/database.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import UserRoutes from './route/user.js'
import CourseRoutes from './route/course.js'
import EnrollmentRoutes from './route/enrollment.js'
import bodyParser from 'body-parser'
dotenv.config()

dbConnect()
const app = express()
app.use(express.json());

app.use('/user', UserRoutes)
app.use('/course', CourseRoutes)
app.use('/enrollment', EnrollmentRoutes)

app.get('/', (req, res) => {
    res.send(`Server is running in ${process.env.NODE_ENV} environment`)
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
)

export default app