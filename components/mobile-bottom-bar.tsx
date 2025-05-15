import Image from "next/image"

export default function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-blue-100 shadow-sm z-50">
      <div className="flex items-center justify-center py-2.5 px-4">
         <span className="text-xs font-medium text-blue-600 ml-2">Member</span>
        <Image
          src="/microsoft-logo.png"
          alt="Microsoft for Startups"
          width={16}
          height={16}
          className="h-4 w-auto mx-1.5"
        />
        <span className="text-xs text-blue-700">Microsoft for Startups Founders Hub</span>
      </div>
    </div>
  )
}
