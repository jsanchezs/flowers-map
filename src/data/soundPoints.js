const audioBaseUrl = 'https://pub-bb6b358cd6e749539cc74f254879583a.r2.dev/'
const audioPath = (filename) => `${audioBaseUrl}${encodeURIComponent(filename)}`

const soundPoints = [
  {
    id: 'fourquet-10',
    title: 'Calle Doctor Fourquet 10',
    address: 'Calle del Doctor Fourquet, 10, Centro, 28012 Madrid',
    description: 'Escucha situada junto al eje de galerías y talleres de Doctor Fourquet.',
    lat: 40.4084144,
    lng: -3.6960289,
    audioUrl: audioPath('Fourquet 10.m4a'),
  },
  {
    id: 'hostal-xucar',
    title: 'Hostal Xucar',
    address: 'Calle de la Magdalena, 28, Centro, 28012 Madrid',
    description: 'Una parada en la Calle de la Magdalena, cerca de Antón Martín.',
    lat: 40.41219,
    lng: -3.70066,
    audioUrl: audioPath('Hostal Xucar.m4a'),
  },
  {
    id: 'plaza-nelson-mandela',
    title: 'Plaza de Nelson Mandela',
    address: 'Plaza de Nelson Mandela, Centro, 28012 Madrid',
    description: 'Un espacio abierto del barrio para detenerse dentro del recorrido.',
    lat: 40.4097228,
    lng: -3.7036162,
    audioUrl: audioPath('Plaza Nelson Mandela.m4a'),
  },
  {
    id: 'primavera-1',
    title: 'Calle Primavera 1',
    address: 'Calle de la Primavera, 1, Centro, 28012 Madrid',
    description: 'Una escucha en la Calle de la Primavera, en el entorno de Lavapiés.',
    lat: 40.40902,
    lng: -3.70043,
    audioUrl: audioPath('Primavera 1 - Elena Santos.m4a'),
  },
  {
    id: 'san-lorenzo',
    title: 'Parroquia de San Lorenzo',
    address: 'Calle del Doctor Piga, 2, Centro, 28012 Madrid',
    description: 'Una parada junto a la parroquia, entre Doctor Piga y la trama interior del barrio.',
    lat: 40.4086862,
    lng: -3.6990964,
    audioUrl: audioPath('PSanLorenzo.m4a'),
  },
  {
    id: 'benteveo',
    title: 'Benteveo',
    address: 'Calle de Santa Isabel, 34, Centro, 28012 Madrid',
    description: 'Escucha situada en Santa Isabel, cerca del Mercado de Antón Martín.',
    lat: 40.4105718,
    lng: -3.6981253,
    audioUrl: audioPath('Benteveo.m4a'),
  },
]

export default soundPoints
