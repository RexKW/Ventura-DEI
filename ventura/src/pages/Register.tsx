import React, { useState } from 'react'
import { login, register } from '../apis/UserCRUD'
import { useNavigate } from 'react-router-dom'
import FrontCity from "../assets/FrontCity.svg"
import BackCity from "../assets/BackCity.svg"

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreement, setAgreement] = useState(false);
    const [popUp,setPopUp] = useState(false);
    const navigate = useNavigate();
        
    const fetchAUser = async () =>{
        try{
            const response = await register(username, email, password)
            console.log('API Response:', response);
              if(!response.data.token){
                alert("User not found")
              }else{
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('subscription', "free");
                navigate("/Ventura/itineraries");
                
              }
          
        }catch(error){
            console.log(error)
        }
        
    
    }
    
    const handleRegister = (e: React.FormEvent) => {
      e.preventDefault(); 
      fetchAUser();
    };

    const handlePopUp = (e: React.MouseEvent) => {
        e.preventDefault();
        setPopUp(!popUp);
    }

  return (
    <div className='flex flex-col w-full bg-[#F9F9F9] h-[100vh] justify-center items-center content-center relative'>
        <img src={BackCity} alt="leftBack" className='absolute bottom-0 left-[-20%] w-[50%] md:w-[20%] md:left-0' draggable="false" />
        <img src={FrontCity}  alt="leftFront" className='absolute bottom-0 left-[-20%] w-[50%] md:w-[25%] md:left-0 scale-x-[-1]' draggable="false" />
        <img src={BackCity}   alt="rightBack" className='absolute bottom-0 right-[-20%] w-[50%] md:w-[20%] md:right-0 scale-x-[-1]' draggable="false" />
        <img src={FrontCity}  alt="rightFront" className='absolute bottom-0 right-[-20%] w-[50%] md:w-[25%] md:right-0' draggable="false" />
      <div className='bg-[#F9F9F9] shadow-md scale-[97.5%] box-1 w-[90vw] z-3 p-5 px-7 md:w-[25vw] rounded-[20px]'>
      <p className='w-full text-center text-xl batman text-black font-bold'>Register</p>
      <form onSubmit={handleRegister}>
      <div className='flex flex-col'>
          <label className='text-black'>Email</label>
          <input name="email" className=' rounded-[10px] bg-[#F9F9F9] border-2 border-[#167DE5] p-2 focus:bg-pink-200 transition duration-200' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className='flex flex-col'>
          <label className='text-black'>Username</label>
          <input name="email" className='  rounded-[10px] bg-[#F9F9F9] border-2 border-[#167DE5] p-2 focus:bg-pink-200 transition duration-200' value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>

        <div className='flex flex-col mt-4'>
          <label className='text-black'>Password</label>
          <input name="password" type='password' className=' rounded-[10px] bg-[#F9F9F9] border-2 border-[#167DE5] p-2 focus:bg-pink-200 transition duration-200'value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <div className='flex flex-col mt-4'>
          <label className='text-black'>Confirm Password</label>
          <input name="password" type='password' className=' rounded-[10px] bg-[#F9F9F9] border-2 border-[#167DE5] p-2 focus:bg-pink-200 transition duration-200'value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        </div>

        <div className='flex items-center gap-1 justify-center mt-4'>
            <p className='flex items-center text-xs text-gray-400'>I have agreed to the</p>
            <button onClick={handlePopUp} className='text-xs text-gray-400'>Terms & Conditions</button>
             <input type="checkbox" className='flex items-end' checked={agreement} onChange={(e) => setAgreement(e.target.checked)}/>
            
        </div>

        <div className='flex mt-2 flex-col'>
        <button type="submit" className='bg-[#167DE5] p-2 justify-center text-white text-center mt-5 rounded-[10px] bg-pink-400 hover:bg-pink-600 transition duration-200 batman'>Register</button>
        <p className='text-xs text-center mt-5'>Already have an account? <a href="/Ventura/login" className='font-bold text-[#167DE5] hover:text-pink-400 transition duration-200'>Login Now</a></p>
  
        
        </div>
        </form>
        
      </div>
      {popUp && (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    aria-modal="true"
    role="dialog"
  >
    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 mx-4">
      <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
      <div className="overflow-y-auto max-h-60 text-sm leading-relaxed">
        {/* Your terms text here */}
        <div className="terms-section">
        <h2 className="terms-heading">1. Consent of Use / Persetujuan Penggunaan</h2>
        <p><strong>EN:</strong> By accessing and using Ventura, you are deemed to have read, understood, and agreed to all applicable terms and conditions. If you do not agree to any part of these terms, please refrain from using our services.</p>
        <p><strong>ID:</strong> Dengan mengakses dan menggunakan Ventura, Anda dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku. Jika Anda tidak menyetujui sebagian atau seluruh ketentuan ini, mohon untuk tidak menggunakan layanan kami.</p>
      </div>
        <br/>
      <div className="terms-section">
        <h2 className="terms-heading">2. Data Collection and Use / Pengumpulan dan Penggunaan Data</h2>
        <p><strong>EN:</strong> Ventura collects personal information such as name, email, travel preferences, and your itinerary data for internal purposes. This data is used to:</p>
        <ul>
          <li>Support your travel planning process</li>
          <li>Customize features and relevant recommendations</li>
          <li>Improve and develop our platform</li>
        </ul>
        <p>Ventura will not share, sell, or distribute your personal data to any third party not affiliated with our services.</p>
        <p><strong>ID:</strong> Ventura mengumpulkan informasi pribadi seperti nama, email, preferensi perjalanan, dan data itinerary Anda untuk keperluan internal. Data ini digunakan untuk:</p>
        <ul>
          <li>Membantu proses perencanaan perjalanan Anda</li>
          <li>Menyesuaikan fitur dan rekomendasi yang relevan</li>
          <li>Memperbaiki dan mengembangkan platform kami</li>
        </ul>
        <p>Ventura tidak akan membagikan, menjual, atau menyebarluaskan data pribadi Anda kepada pihak ketiga yang tidak berhubungan dengan layanan kami.</p>
      </div>
        <br/>
      <div className="terms-section">
        <h2 className="terms-heading">3. Platform Usage / Penggunaan Platform</h2>
        <p><strong>EN:</strong> You agree not to use Ventura for illegal activities, system disruption, or interfering with other users’ experiences. Any violation may result in permanent account suspension.</p>
        <p><strong>ID:</strong> Anda setuju untuk tidak menggunakan Ventura untuk aktivitas ilegal, merusak sistem, atau mengganggu pengalaman pengguna lain. Setiap pelanggaran dapat menyebabkan pemblokiran akun Anda secara permanen.</p>
      </div>
        <br/>
      <div className="terms-section">
        <h2 className="terms-heading">4. User-Generated Content / Konten Pengguna</h2>
        <p><strong>EN:</strong> All content you upload or share (such as itinerary notes or wishlists) is your sole responsibility. Ventura is not liable for any offensive or third-party-infringing content.</p>
        <p><strong>ID:</strong> Semua konten yang Anda unggah atau bagikan (seperti catatan itinerary atau wishlist) adalah tanggung jawab pribadi Anda. Ventura tidak bertanggung jawab atas konten yang menyinggung atau melanggar hak pihak ketiga.</p>
      </div>
        <br/>
      <div className="terms-section">
        <h2 className="terms-heading">5. Account Security / Keamanan Akun</h2>
        <p><strong>EN:</strong> You are responsible for maintaining the confidentiality of your login credentials. If you notice any suspicious activity on your account, please contact our team immediately.</p>
        <p><strong>ID:</strong> Anda bertanggung jawab menjaga keamanan informasi login Anda. Jika terjadi aktivitas mencurigakan pada akun Anda, segera hubungi tim kami.</p>
      </div>
        <br/>
      <div className="terms-section">
        <h2 className="terms-heading">6. Changes to Terms / Perubahan Ketentuan</h2>
        <p><strong>EN:</strong> Ventura reserves the right to change these terms at any time. Updates will be posted on the platform and effective from the date of publication.</p>
        <p><strong>ID:</strong> Ventura berhak untuk mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diinformasikan melalui platform dan berlaku sejak tanggal pembaruan.</p>
      </div>
        <br/>
      <div className="terms-section">
        <h2 className="terms-heading">7. Contact Us / Kontak</h2>
        <p><strong>EN:</strong> For further questions regarding this policy, please contact us via [email/contact section].</p>
        <p><strong>ID:</strong> Untuk pertanyaan lebih lanjut mengenai kebijakan ini, Anda dapat menghubungi kami melalui [email/contact section].</p>
      </div>
        {/* … */}
      </div>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        onClick={handlePopUp}
      >
        Close
      </button>
    </div>
  </div>
)}
      
    </div>
  )
}

export default Register
