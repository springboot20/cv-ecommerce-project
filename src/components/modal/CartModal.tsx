import { XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from '../../helpers'
import { Link } from 'react-router-dom'

export default function CartModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div
      className={classNames(
        'h-screen w-[30rem] bg-white shadow-sm border transition-all fixed top-0 z-10 p-8',
        isOpen ? 'right-0' : '-right-full',
      )}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-10 w-10 flex items-center justify-center absolute right-4 top-8 rounded-full bg-gray-100"
      >
        <span className="sr-only">close button</span>
        <XMarkIcon className="h-7 stroke-[3]" />
      </button>
      <div className="">
        <Link
          to="/cart"
          className="block py-4 px-2 text-center text-xl rounded-md bg-gray-900 text-white"
        >
          continue to check out
        </Link>
      </div>
    </div>
  )
}
