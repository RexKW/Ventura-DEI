import LogoText from '../assets/LogoText.svg'

function Navbar() {
  return (
    <nav className='hidden md:flex fixed top-0 mx-auto w-screen z-50  flex h-[10vh]'>
        <div className='flex justify-between bg-[#FFFFFF] shadow-md w-full items-center px-10'>
            <img src={LogoText} alt="logo" />
            <ul className='flex gap-5 items-center'>
                <li><a href="#home" className='text-xl font-semibold hover:bg-[#F6C93B] px-3 py-2 transition rounded-[10px]'>Home</a></li>
                <li><a href="#about" className='text-xl font-semibold hover:bg-[#F6C93B] px-3 py-2 transition rounded-[10px]'>About</a></li>
                <li><a href="#features" className='text-xl font-semibold hover:bg-[#F6C93B] px-3 py-2 transition rounded-[10px]'>Features</a></li>
                <li><a href="#prices" className='text-xl font-semibold hover:bg-[#F6C93B] px-3 py-2 transition rounded-[10px]'>Prices</a></li>
            </ul>
            <a  href="/Ventura/login" className='bg-[#167DE5] px-10 py-3 my-5 rounded-[20px] text-xl font-bold text-white hover:bg-[#F6C93B] transition hover:text-black'><p>Login</p></a>
        </div>
    </nav>
  )
}

export default Navbar
