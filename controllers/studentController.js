import Student from "../Models/student.js"

export function getStudents(req,res){
    Student.find().then(
     (studentList)=>{
         res.status(500).json({
             list:studentList
         })
    })
}

export function createStudent(req,res){
    const student = new Student(req.body)
    student.save().then(()=>{
        res.json({
            message:"Student is created"
        })
    }).catch(()=>{
        res.json({
            message:"Student is not created"
        })
    })
}

export function deleteStudent(req,res){
    Student.deleteOne({name:req.body.name}).then(
        ()=>{
            res.json({
                message:"Student deleted successfully"
            })
        }
    )
}

