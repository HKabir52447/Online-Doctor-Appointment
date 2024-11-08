import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/AppointmentModel.js'
// import razorpay from 'razorpay'


// api to register user

const registerUser = async (req, res) =>{

    try {
        
        const { name, email, password } = req.body

        if( !name || !password || !email){
            return res.json({success: false, message: "Missing details"})
        }

        if( !validator.isEmail(email)){
            return res.json({success: false, message: "Enter a valid email"}) 
        }

        if(password.length < 8){
            return res.json({success: false, message: "Enter minimum 8 character password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        res.json({success: true, token})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// api for user login

const loginUser = async (req, res) =>{

    try {
        
        const {email, password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
           return res.json({success: false, message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else{
            res.json({success: false, message: "Invalid credentials"})
        }

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// api to get user profile data
const getProfile = async(req, res) =>{
    
    try {
        
        const {userId} = req.body
        const userData = await userModel.findById(userId).select('-password')
        res.json({success: true, userData})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

    // api to update user profile

    const updateProfile = async(req, res)=>{

        try {
            const { userId, name, phone, address, dob, gender } = req.body;
            const imageFile = req.file;
        
            if (!name || !phone || !dob || !gender) {
              return res.json({ success: false, message: 'Data missing' });
            }
        
            if (imageFile) {
              // Upload image to Cloudinary
              const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
              const imageUrl = imageUpload.secure_url;
              await userModel.findByIdAndUpdate(userId, { image: imageUrl });
            }
        
            await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender });
            res.json({ success: true, message: 'Profile updated' });
        
          } catch (error) {
            res.json({ success: false, message: error.message });
          }
    
}

// API to book appointment
const bookAppointment = async (req, res) =>{

    try {
        
        const {userId, docId, slotDate, slotTime} = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if(!docData.available){
            return res.json({success: false, message: "Doctor not available"})
        }

        let slots_booked = docData.slots_booked

        //checking for slot availablity
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success: false, message: "Slot not available"})
            } else{
                slots_booked[slotDate].push(slotTime)
            }
        } else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData ={
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()

        }

        const newAppointment = new appointmentModel(appointmentData)

        await newAppointment.save()

        // save new slot data in docData
        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success: true, message: "Appointment Booked"})

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// api to get user appointments for frontend my-appointment page
const listAppointment = async (req, res) =>{
    try {
        
        const {userId} = req.body
        const appointments = await appointmentModel.find({userId})

        res.json({success: true, appointments})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// API to cancel an appointment
const cancelAppointment = async (req, res) => {
    try {
      
      const { userId, appointmentId } = req.body;
  
      // Find the appointment data using appointment ID
      const appointmentData = await appointmentModel.findById(appointmentId);
  
      // Verify if the user is authorized to cancel the appointment
      if (appointmentData.userId !== userId) {
        return res.json({ success: false, message: 'Unauthorized action' });
      }
  
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

      // releasing doctor slot
      const {docId, slotDate, slotTime} = appointmentData;
      const doctorData = await doctorModel.findById(docId);

      let slots_booked = doctorData.slots_booked;

      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e!== slotTime);

      await doctorModel.findByIdAndUpdate(docId, {slots_booked})

      res.json({success: true, message: "Appointment cancelled"})
  
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  };

//   const razorpayInstance = new razorpay({
//     key_id: '',
//     key_secret: ''
//   })
//   // api to make payment using razorpay
//   const paymentRazorpay = async (req, res) =>{

//   }


export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment}