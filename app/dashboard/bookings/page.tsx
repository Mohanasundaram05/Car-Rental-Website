const mockBookings = [
  {
    id: 1,
    guestName: "John Doe",
    roomType: "Deluxe Suite",
    checkInDate: "2024-07-15",
    checkOutDate: "2024-07-20",
    totalAmount: 69993,
    status: "Confirmed",
  },
  {
    id: 2,
    guestName: "Jane Smith",
    roomType: "Standard Room",
    checkInDate: "2024-08-01",
    checkOutDate: "2024-08-05",
    totalAmount: 49995,
    status: "Checked In",
  },
  {
    id: 3,
    guestName: "David Lee",
    roomType: "Executive Suite",
    checkInDate: "2024-08-10",
    checkOutDate: "2024-08-17",
    totalAmount: 37497,
    status: "Confirmed",
  },
]

const BookingCard = ({ booking }: { booking: any }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">{booking.guestName}</h3>
      <p className="text-gray-600">Room Type: {booking.roomType}</p>
      <p className="text-gray-600">Check-in: {booking.checkInDate}</p>
      <p className="text-gray-600">Check-out: {booking.checkOutDate}</p>
      <p className="text-green-600 font-bold">Total: ₹{booking.totalAmount.toLocaleString("en-IN")}</p>
      <p className="text-blue-600">Status: {booking.status}</p>
    </div>
  )
}

const BookingsPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockBookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  )
}

export default BookingsPage
