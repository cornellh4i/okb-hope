import Image from 'next/image'

export default function BookApp() {
  return (
    <div>
      <p>
        Book App
      </p>
      <Image
        priority
        src="/Assets/temp_calendar.svg"
        height={32}
        width={32}
        alt="Follow us on Twitter"
      />
    </div>
  )
}