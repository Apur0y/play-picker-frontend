import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function LogoPP() {
    const router =useRouter();
  return (
    <div onClick={()=>router.push("/")} className='flex justify-center'> 
          <Image
            src="/pplogo.png"
            alt="Logo"
            width={400}
            height={400}
            className="w-40 h-40 object-contain"
          />
          {/* <div className="text-2xl flex items-center uppercase">
            <span className=" ">Play</span>
            <span className=" ">Picker</span>
          </div> */}
    </div>
  )
}
