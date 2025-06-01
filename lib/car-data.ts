export interface Car {
  id: number
  name: string
  lightImage: string
  darkImage: string
  price: number
  fuel: string
  transmission: string
  seats: number
  tags: string[]
  type?: string
  rating?: number
  reviews?: number
  features?: Array<{
    icon: any
    name: string
    value: string
  }>
  description?: string
  gallery?: {
    light: string[]
    dark: string[]
  }
}

export const carsData: Car[] = [
  {
    id: 1,
    name: "Rolls-Royce Phantom",
    lightImage: "/cr1.png?height=300&width=400&text=BMW+X5+Light",
    darkImage: "/cr1.png?height=300&width=400&text=BMW+X5+Dark&bg=1a1a1a&color=ffffff",
    price: 9999,
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 5,
    tags: ["Luxury", "SUV"],
    type: "SUV",
    rating: 4.8,
    reviews: 124,
    description:
      "Experience luxury and performance with the Rolls-Royce Phantom. This premium SUV combines elegant design with cutting-edge technology, making it perfect for both city driving and long road trips.",
    gallery: {
      light: [
        "/cr11.png?height=400&width=600&text=BMW+X5+Gallery+1+Light",
        "/cr12.png?height=400&width=600&text=BMW+X5+Gallery+2+Light",
        "/cr13.png?height=400&width=600&text=BMW+X5+Gallery+3+Light",
      ],
      dark: [
        "/cr11.png?height=400&width=600&text=BMW+X5+Gallery+1+Dark&bg=1a1a1a&color=ffffff",
        "/cr12.png?height=400&width=600&text=BMW+X5+Gallery+2+Dark&bg=1a1a1a&color=ffffff",
        "/cr13.png?height=400&width=600&text=BMW+X5+Gallery+3+Dark&bg=1a1a1a&color=ffffff",
      ],
    },
  },
  {
    id: 2,
    name: "Mercedes S-Class",
    lightImage: "/cr2.png?height=300&width=400&text=Mercedes+C-Class+Light",
    darkImage: "/cr2.png?height=300&width=400&text=Mercedes+C-Class+Dark&bg=1a1a1a&color=ffffff",
    price: 8499,
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 5,
    tags: ["Luxury", "Sedan"],
    type: "Sedan",
    rating: 4.7,
    reviews: 98,
    description:
      "The Mercedes S-Class offers the perfect blend of luxury, performance, and technology in a sophisticated sedan package.",
    gallery: {
      light: [
        "/cr21.png?height=400&width=600&text=Mercedes+Gallery+1+Light",
        "/cr22.png?height=400&width=600&text=Mercedes+Gallery+2+Light",
        "/cr23.png?height=400&width=600&text=Mercedes+Gallery+3+Light",
      ],
      dark: [
        "/cr21.png?height=400&width=600&text=Mercedes+Gallery+1+Dark&bg=1a1a1a&color=ffffff",
        "/cr22.png?height=400&width=600&text=Mercedes+Gallery+2+Dark&bg=1a1a1a&color=ffffff",
        "/cr23.png?height=400&width=600&text=Mercedes+Gallery+3+Dark&bg=1a1a1a&color=ffffff",
      ],
    },
  },
  {
    id: 3,
    name: "Audi RS 7 Mansory",
    lightImage: "/cr3.png?height=300&width=400&text=Audi+A4+Light",
    darkImage: "/cr3.png?height=300&width=400&text=Audi+A4+Dark&bg=1a1a1a&color=ffffff",
    price: 7499,
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 5,
    tags: ["Premium", "Sedan"],
    type: "Sedan",
    rating: 4.6,
    reviews: 87,
    description: "The Audi RS 7 Mansory delivers premium comfort and advanced technology in an elegantly designed sedan.",
    gallery: {
      light: [
        "/cr31.png?height=400&width=600&text=Audi+Gallery+1+Light",
        "/cr32.png?height=400&width=600&text=Audi+Gallery+2+Light",
        "/cr33.png?height=400&width=600&text=Audi+Gallery+3+Light",
      ],
      dark: [
        "/cr31.png?height=400&width=600&text=Audi+Gallery+1+Dark&bg=1a1a1a&color=ffffff",
        "/cr32.png?height=400&width=600&text=Audi+Gallery+2+Dark&bg=1a1a1a&color=ffffff",
        "/cr33.png?height=400&width=600&text=Audi+Gallery+3+Dark&bg=1a1a1a&color=ffffff",
      ],
    },
  },
  {
    id: 4,
    name: "Lamborghini Urus SE",
    lightImage: "/cr4.png?height=300&width=400&text=Toyota+Camry+Light",
    darkImage: "/cr4.png?height=300&width=400&text=Toyota+Camry+Dark&bg=1a1a1a&color=ffffff",
    price: 5999,
    fuel: "Hybrid",
    transmission: "Automatic",
    seats: 5,
    tags: ["Economy", "Sedan"],
    type: "Sedan",
    rating: 4.5,
    reviews: 156,
    description:
      "The Lamborghini Urus SE Hybrid offers exceptional fuel efficiency without compromising on comfort and reliability.",
    gallery: {
      light: [
        "/cr41.png?height=400&width=600&text=Toyota+Gallery+1+Light",
        "/cr42.png?height=400&width=600&text=Toyota+Gallery+2+Light",
        "/cr43.png?height=400&width=600&text=Toyota+Gallery+3+Light",
      ],
      dark: [
        "/cr41.png?height=400&width=600&text=Toyota+Gallery+1+Dark&bg=1a1a1a&color=ffffff",
        "/cr42.png?height=400&width=600&text=Toyota+Gallery+2+Dark&bg=1a1a1a&color=ffffff",
        "/cr43.png?height=400&width=600&text=Toyota+Gallery+3+Dark&bg=1a1a1a&color=ffffff",
      ],
    },
  },
  {
    id: 5,
    name: "Bentley Continental GT",
    lightImage: "/cr5.png?height=300&width=400&text=Honda+CR-V+Light",
    darkImage: "/cr5.png?height=300&width=400&text=Honda+CR-V+Dark&bg=1a1a1a&color=ffffff",
    price: 6799,
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 5,
    tags: ["Family", "SUV"],
    type: "SUV",
    rating: 4.4,
    reviews: 203,
    description:
      "The Bentley Continental GT is the perfect family SUV, offering spacious interiors, excellent safety features, and reliable performance.",
    gallery: {
      light: [
        "/cr51.png?height=400&width=600&text=Honda+Gallery+1+Light",
        "/cr52.png?height=400&width=600&text=Honda+Gallery+2+Light",
        "/cr53.png?height=400&width=600&text=Honda+Gallery+3+Light",
      ],
      dark: [
        "/cr51.png?height=400&width=600&text=Honda+Gallery+1+Dark&bg=1a1a1a&color=ffffff",
        "/cr52.png?height=400&width=600&text=Honda+Gallery+2+Dark&bg=1a1a1a&color=ffffff",
        "/cr53.png?height=400&width=600&text=Honda+Gallery+3+Dark&bg=1a1a1a&color=ffffff",
      ],
    },
  },
  {
    id: 6,
    name: "Porsche 911 GT3 RS",
    lightImage: "/cr6.png?height=300&width=400&text=Tesla+Model+3+Light",
    darkImage: "/cr6.png?height=300&width=400&text=Tesla+Model+3+Dark&bg=1a1a1a&color=ffffff",
    price: 9199,
    fuel: "Electric",
    transmission: "Automatic",
    seats: 5,
    tags: ["Electric", "Sedan"],
    type: "Sedan",
    rating: 4.9,
    reviews: 312,
    description:
      "The Porsche 911 GT3 RS represents the future of driving with cutting-edge electric technology and autonomous features.",
    gallery: {
      light: [
        "/cr6.png?height=400&width=600&text=Tesla+Gallery+1+Light",
        "/cr6.png?height=400&width=600&text=Tesla+Gallery+2+Light",
        "/cr6.png?height=400&width=600&text=Tesla+Gallery+3+Light",
      ],
      dark: [
        "/cr6.png?height=400&width=600&text=Tesla+Gallery+1+Dark&bg=1a1a1a&color=ffffff",
        "/cr6.png?height=400&width=600&text=Tesla+Gallery+2+Dark&bg=1a1a1a&color=ffffff",
        "/cr6.png?height=400&width=600&text=Tesla+Gallery+3+Dark&bg=1a1a1a&color=ffffff",
      ],
    },
  },
  {
    id: 7,
    name: "Ford Mustang",
    lightImage: "/cr7.png?height=300&width=400&text=Ford+Mustang+Light",
    darkImage: "/cr7.png?height=300&width=400&text=Ford+Mustang+Dark&bg=1a1a1a&color=ffffff",
    price: 7999,
    fuel: "Petrol",
    transmission: "Manual",
    seats: 4,
    tags: ["Sports", "Coupe"],
    type: "Sports",
    rating: 4.7,
    reviews: 89,
    description:
      "The Ford Mustang delivers pure American muscle car performance with iconic styling and thrilling driving dynamics.",
    gallery: {
      light: [
        "/cr71.png?height=400&width=600&text=Mustang+Gallery+1+Light",
        "/cr72.png?height=400&width=600&text=Mustang+Gallery+2+Light",
        "/cr73.png?height=400&width=600&text=Mustang+Gallery+3+Light",
      ],
      dark: [
        "/cr71.png?height=400&width=600&text=Mustang+Gallery+1+Dark&bg=1a1a1a&color=ffffff",
        "/cr72.png?height=400&width=600&text=Mustang+Gallery+2+Dark&bg=1a1a1a&color=ffffff",
        "/cr73.png?height=400&width=600&text=Mustang+Gallery+3+Dark&bg=1a1a1a&color=ffffff",
      ],
    },
  },
  {
    id: 8,
    name: "BMW X6",
    lightImage: "/cr8.png?height=300&width=400&text=VW+Golf+Light",
    darkImage: "/cr8.png?height=300&width=400&text=VW+Golf+Dark&bg=1a1a1a&color=ffffff",
    price: 4999,
    fuel: "Petrol",
    transmission: "Manual",
    seats: 5,
    tags: ["Economy", "Hatchback"],
    type: "Hatchback",
    rating: 4.3,
    reviews: 145,
    description:
      "The BMW X6 offers German engineering excellence in a compact, efficient, and versatile hatchback.",
    gallery: {
      light: [
        "/cr81.png?height=400&width=600&text=VW+Gallery+1+Light",
        "/cr82.png?height=400&width=600&text=VW+Gallery+2+Light",
        "/cr83.png?height=400&width=600&text=VW+Gallery+3+Light",
      ],
      dark: [
        "/cr81.png?height=400&width=600&text=VW+Gallery+1+Dark&bg=1a1a1a&color=ffffff",
        "/cr82.png?height=400&width=600&text=VW+Gallery+2+Dark&bg=1a1a1a&color=ffffff",
        "/cr83.png?height=400&width=600&text=VW+Gallery+3+Dark&bg=1a1a1a&color=ffffff",
      ],
    },
  },
]
