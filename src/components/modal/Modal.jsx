import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function Modal({ name, address, pincode, phoneNumber, setName, setAddress, setPincode, setPhoneNumber, buyNow, paymentMethod }) {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  const handleOrder = (e) => {
    e.preventDefault();
    buyNow();
    closeModal();
  };

  return (
    <>
      <div className="text-center rounded-lg font-bold">
        <button
          type="button"
          onClick={openModal}
          className="w-full bg-green-600 py-2 text-center rounded-lg text-white font-semibold hover:bg-green-700 transition"
        >
          Buy Now
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-50 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-xl font-semibold text-gray-900 mb-2">
                    Shipping Details
                  </Dialog.Title>
                  <p className="text-sm text-gray-500 mb-6">
                    {paymentMethod === 'cod' 
                      ? 'Please provide your delivery information. You will pay when the product is delivered.'
                      : 'Please provide your delivery information so we can process the order.'}
                  </p>
                  <form className="space-y-4" onSubmit={handleOrder}>
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                        Enter Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                        Enter Full Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900">
                        Enter Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        id="pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900">
                        Enter Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        id="mobileNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 transition focus:outline-none"
                    >
                      {paymentMethod === 'cod' ? 'Place Order (COD)' : 'Continue to Payment'}
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

