import { getRandomNumber } from "./random";

export function generateRandomCategory() {
  return categories[getRandomNumber(0, categories.length)];
}

export const categories = [
  "Science: Astronomy",
  "General Knowledge: Famous Authors",
  "Science: Chemistry",
  "Geography: World Capitals",
  "History: Ancient Civilizations",
  "Music: Classical Composers",
  "Sports: Olympic Records",
  "Literature: Classic Novels",
  "Science: Biology",
  "Movies: Academy Award Winners",
  "Geography: Landforms",
  "History: World Wars",
  "Art: Famous Paintings",
  "Sports: Soccer Legends",
  "Literature: Poetry",
  "Science: Physics",
  "Movies: Film Directors",
  "General Knowledge: Inventions",
  "Geography: Rivers of the World",
  "History: Renaissance",
  "Music: Pop Hits",
  "Sports: Basketball Rules",
  "Literature: Shakespearean Plays",
  "Science: Environmental Science",
  "Movies: Movie Quotes",
  "General Knowledge: Mythology",
  "Geography: Continents and Oceans",
  "History: Industrial Revolution",
  "Art: Sculptures",
  "Sports: Tennis Grand Slam Winners",
  "Literature: Science Fiction",
  "Science: Paleontology",
  "Movies: Animated Films",
  "Geography: Countries and Flags",
  "History: Middle Ages",
  "Music: Jazz Legends",
  "Sports: Baseball Trivia",
  "Literature: Nobel Prize in Literature Winners",
  "Science: Mathematics",
  "General Knowledge: World Religions",
  "Geography: Islands of the World",
  "History: Ancient Egypt",
  "Art: Renaissance Art",
  "Sports: Golf Championships",
  "Movies: Action Movie Heroes",
  "Literature: American Literature",
  "Science: Medicine and Health",
  "General Knowledge: Famous Inventors",
  "Geography: Mountain Ranges",
  "History: Age of Exploration",
  "Music: Rock Bands",
  "Sports: Formula 1 Racing",
  "Literature: Romantic Poets",
  "Science: Geology",
  "General Knowledge: World Leaders",
  "Science: Genetics",
  "Geography: Deserts of the World",
  "History: Famous Revolutions",
  "Music: Broadway Musicals",
  "Sports: Winter Olympic Sports",
  "Literature: Mystery Novels",
  "Science: Botany",
  "Movies: Classic Horror Films",
  "Geography: National Parks",
  "History: Ancient Greece",
  "Art: Impressionist Paintings",
  "Sports: Rugby Trivia",
  "Literature: British Authors",
  "Science: Astronomy: Solar System",
  "Movies: Science Fiction Films",
  "General Knowledge: Famous Scientists",
  "Geography: Lakes of the World",
  "History: Cold War Era",
  "Music: Hip Hop Artists",
  "Sports: Volleyball Rules",
  "Literature: Classic Plays",
  "Science: Meteorology",
  "Movies: Romantic Comedies",
  "General Knowledge: Space Exploration",
  "Geography: World Heritage Sites",
  "History: Renaissance Artists",
  "Art: Modern Art Movements",
  "Sports: Cricket Facts",
  "Literature: Fantasy Novels",
  "Science: Chemistry: Elements",
  "Movies: Film Genres",
  "Geography: Urban Geography",
  "History: Age of Enlightenment",
  "Music: Country Music Stars",
  "Sports: Martial Arts",
  "Literature: Russian Literature",
  "Science: Zoology",
  "General Knowledge: Famous Philosophers",
  "Geography: Coral Reefs",
  "History: American Civil War",
  "Art: Baroque Art",
  "Sports: Equestrian Sports",
  "Movies: Film Festivals",
  "Literature: Detective Fiction",
  "Science: Neuroscience",
  "General Knowledge: Famous Inventors (Part II)",
  "Geography: World Wonders",
  "History: Industrial Age",
  "Music: Reggae Legends",
  "Sports: Gymnastics Facts",
  "Literature: African Literature",
];
