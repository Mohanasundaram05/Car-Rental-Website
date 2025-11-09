const mockBookings = [
  {
    id: 1,
    customerName: "John Doe",
    carModel: "Tesla Model 3",
    pickupDate: "2024-07-15",
    dropoffDate: "2024-07-20",
    rentalPrice: 19999,
    status: "Confirmed",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    carModel: "BMW X5",
    pickupDate: "2024-08-01",
    dropoffDate: "2024-08-05",
    rentalPrice: 24999,
    status: "Picked Up",
  },
  {
    id: 3,
    customerName: "David Lee",
    carModel: "Audi A6",
    pickupDate: "2024-08-10",
    dropoffDate: "2024-08-14",
    rentalPrice: 17999,
    status: "Confirmed",
  },
];

const BookingCard = ({ booking }: { booking: any }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">{booking.customerName}</h3>

      <p className="text-gray-600">Car Model: {booking.carModel}</p>
      <p className="text-gray-600">Pickup Date: {booking.pickupDate}</p>
      <p className="text-gray-600">Dropoff Date: {booking.dropoffDate}</p>

      <p className="text-green-600 font-bold">
        Rental Price: ₹{booking.rentalPrice.toLocaleString("en-IN")}
      </p>

      <p className="text-blue-600 font-semibold">Status: {booking.status}</p>
    </div>
  );
};

const BookingsPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Car Bookings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockBookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
