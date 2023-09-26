// bin/seeds.js

const mongoose = require("mongoose");
const Destinations = require("../models/Destination.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/Explore-Africa";

const destinations = [
  {
    location: "Kenya",
    safari: "Maasai Mara National Reserve",
    description:
      " In southwest Kenya, near Tanzania, this premier national park offers everything you could want in a safari, as it’s home to over 570 species of birds and 95 species of mammals.It’s also one of the best places to visit in Africa if you want to see the Big Five (lion, Cape buffalo, leopard, rhinoceros, and elephant).While this amazing reserve is open year-round, the best time to visit is either between July and October when the stunning wildebeest migration is happening or between December and February when the chance of spotting more of the big cats is higher.",
    rating: 10,
  },
  {
    location: "Botswana",
    safari: "Chobe National Park",
    description:
      "Botswana’s first and most biologically diverse national park sits in the northern part of the country near the Okavango Delta. Affectionately known as the “Land of the Giants”, an estimated 120,000 elephants call it home, which is Africa’s largest elephant population.Because of the Chobe River, there’s also an unmatched amount of wildlife and birdlife – including hippos, crocodiles, buffaloes, lions, leopards, and countless bird species.Instead of a typical 4×4 vehicle, the absolute best way to experience Chobe National Park is on a boat trip. It provides a unique perspective, amazing views, and stunning photographs.As you plan your trip, keep in mind that Chobe National Park also makes a perfect day trip from Zimbabwe, Namibia, and Zambia because of its close proximity to their borders.",
    rating: 9,
  },
  {
    location: "South Africa",
    safari: "Kruger National Park",
    description:
      "Not only is Kruger National Park renowned for having the best safaris in South Africa and gorgeous mountain, plain, and tropical forest scenery, it’s also one of the continent’s largest game reserves.Located in northeast South Africa near Mozambique, the diversity of species is unparalleled – 507 birds, 336 trees, 147 mammals, 114 reptiles, 49 fish, and 34 amphibians all have their home in Kruger National Park. You can catch glimpses of the Big Five, but the wild dog, ground hornbill, and fish eagle should also be on your radar. If you’re looking to be independent and explore on your own terms, this is a great safari for a self-guided tour, and there are even places to stay the night.",
    rating: 8,
  },
  {
    location: "Tanzania",
    safari: "Serengeti National Park",
    description:
      "When most people think of an African wildlife safari, they think of the Serengeti – and rightly so, as it has inspired many films and books. Between the Serengeti National Park, the Ngorongoro Conservation Area, and its adjacent neighbor, the Maasai Mara National Reserve in Kenya, they protect the greatest and most varied collection of terrestrial wildlife on earth, and one of the last great migratory systems still intact. This migration also puts it at the top of the list of best safaris in Africa. Every October and November over one million wildebeest and 200,000 zebras come south for the rain before heading northwest about six months later. It’s also a great place to catch cheetahs and lions in action as they prey on the herbivores in the area. This crown jewel is the ultimate safari destination.",
    rating: 10,
  },
  {
    location: "Uganda",
    safari: "Bwindi Impenetrable National Park",
    description:
      "Housed in a dense rainforest in southwest Uganda on the edge of the Albertine Rift sits Bwindi Impenetrable National Park. It’s a sanctuary to chimpanzees, monkeys, and half of the world’s population of endangered mountain gorillas.You can even grab a permit and go gorilla trekking if you want to be face-to-face with these interesting primates. While the trails are rough, beautiful birds, butterflies, and floral species are in abundance throughout.",
    rating: 10,
  },
  {
    location: "Namibia",
    safari: "Etosha National Park",
    description:
      "Named the Etosha pan, Etosha National Park is home to hundreds of species of birds, reptiles, and mammals, but it’s most known for the endangered black rhinoceros. Located in northwest Namibia, this park is an ideal place for photographic, camping, and even self-guided safaris. One of the most unique things about Etosha National Park is that they have floodlit waterholes, giving you perfect lighting to admire nocturnal wildlife.",
    rating: 7,
  },
  {
    location: "Zimbabwe",
    safari: "Hwange National Park",
    description:
      "Hwange National Park is the largest park in Zimbabwe and is only one hour south of Victoria Falls. Stretching about 14,650 square kilometers, it’s the only place in the country where you’re likely to see gemsbok and brown hyena. While the elephants here are world-famous, you should also head here because it’s the best African safari to see wild dogs. Whether you camp here or just come for the day, you won’t want to miss the stunning sunset from Dom waterhole…you can even stay later for moonlight game viewing.",
    rating: 10,
  },
  {
    location: "Tanzania",
    safari: "Ngorongoro National Park",
    description:
      "The crown of Ngorongoro is its breathtaking volcanic crater, and it secures its spot as one of the best national parks in Africa. This majestic natural wonder is the largest unflooded and unbroken caldera in the world, and it measures about 20 kilometers across, 600 meters deep, and 300 square kilometers in area.The area houses over 25,000 large animals, not including the almost two million that pass through during the migration. Within the crater there are thousands of wildebeest, eland, gazelles, and zebras, and up in the rainforest of the crater rim there are animals like elephants, reedbuck, and jackals. In the lake within the crater are beautiful flamingos, ostriches, and pelicans. Along with great safaris, this World Heritage Site has so much more to offer its visitors, from the historic Oldupai Gorge to a chance to meet the local Maasai people.",
    rating: 9,
  },
  {
    location: "Zambia",
    safari: "South Luangwa National Park",
    description:
      "This wildlife haven is located in eastern Zambia in the Luangwa River valley. Renowned for its walking tours, South Luangwa National Park is an ideal place to get truly immersed in nature. Definitely head to the river to see crowds of hippos and crocodiles. It’s also home to several hundred Thornicroft’s giraffes, Cape buffaloes, and herds of elephants. The woodland savannah is also ideal for bird watchers and you can even catch leopards after dark.",
    rating: 7,
  },
  {
    location: "Botswana",
    safari: "Okavango Delta",
    description:
      "Known as “Africa’s Last Eden”, this inland river delta is one of the best safari destinations in Africa. The best time to visit is between June and August. This is when the annual flood happens and animals are confined to the islands, making them easier to see. Typically, 200,000 large mammals have their seasonal home in the Okavango Delta, and it’s a regular home to many fish and plant species. It’s also one of the best African safaris to view from both land and water.Each of the top safari destinations in Africa provide amazing opportunities to learn more about wildlife, take photos, and admire the scenery that can only be captured in these unique parks.",
    rating: 8,
  },
];

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);
    return Destiantions.create(destinations);
  })

  .then((destinationsFromDB) => {
    console.log(`Created ${destionationsFromDB.length} destinations`);
    return mongoose.connection.close();
  })

  .then(() => {
    console.log("DB connection closed!");
  })

  .catch((err) => {
    console.log(
      `An error occurred while creating destinations from the DB: ${err}`
    );
  });
