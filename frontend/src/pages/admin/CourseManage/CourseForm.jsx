import React,{useState} from 'react'
import CategoryForm from './CategoryForm'
import { setUser } from '../../../stores/slices/userSlice'
import { useSelector } from 'react-redux'

const CourseForm = () => {

    const user = useSelector((state)=>state.user.user);
    const [formData,setFormData] = useState(
        {
            title:'',
            description:'',
            price:'',
            category:'',
            image:''
        }
    )

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    
  return (
    <div className='bg-gray-100 p-4'>
        <CategoryForm/>

    </div>
  )
}

export default CourseForm