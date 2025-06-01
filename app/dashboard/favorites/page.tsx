const mockFavorites = [
  {
    id: 1,
    name: "Rolls-Royce Phantom",
    image: "https://cdn.motor1.com/images/mgl/0ANZl/s3/2021-rolls-royce-phantom.jpg",
    price: 9999,
  },
  {
    id: 2,
    name: "Porsche 911 GT3 RS",
    image: "https://files.porsche.com/filestore/image/multimedia/none/992-gt3-rs-modelimage-sideshot/thumbwhite/5b7c5f04-98e5-11ec-80e3-005056bbdc38;sU;twebp/porsche-thumbwhite.webp",
    price: 9199,
  },
  {
    id: 3,
    name: "Mercedes S-Class",
    image: "https://www.mercedes-benz.com/en/vehicles/passenger-cars/s-class/_jcr_content/root/slider/sliderchilditems/slideritem/image/MQ6-12-image-20200902104827/01-mercedes-benz-vehicles-s-class-saloon-v223-2020-3400x1440.jpeg",
    price: 8499,
  },
  {
    id: 4,
    name: "Audi RS 7 Mansory",
    image: "https://cdn.motor1.com/images/mgl/WK33V/s3/mansory-audi-rs7-sportback.webp",
    price: 7499,
  },
]

const FavoritesPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockFavorites.map((car) => (
          <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={car.image || "/placeholder.svg"} alt={car.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{car.name}</h2>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ₹{car.price.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavoritesPage
