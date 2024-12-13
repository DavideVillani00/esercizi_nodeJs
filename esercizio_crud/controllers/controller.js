let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

// prendi tutti gli elementi
const getAll = (req, res) => {
  res.status(200).json(planets);
};

// prendi l'elemento con un certo id
const getOneById = (req, res) => {
  const { id } = req.params;
  const planet = planets.find((el) => el.id === Number(id));
  res.status(200).json(planet);
};

// crea un nuovo pianeta
const createOne = (req, res) => {
  const { id, name } = req.body;
  const newPlanet = { id: id, name: name };
  planets = [...planets, newPlanet];
  res.status(201).json({ msg: "pianeta inserito correttamente" });
};

// modifica il pianeta con un certo id
const editOneById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((el) => (el.id === Number(id) ? { ...el, name } : el));
  res.status(200).json({ msg: "pianeta modificato correttamente" });
};

// elimina il pianeta con un certo id
const deleteOneById = (req, res) => {
  const { id } = req.params;
  planets = planets.filter((el) => el.id !== Number(id));
  res.status(200).json({ msg: "pianeta eliminato correttamente" });
};

export { getAll, getOneById, createOne, editOneById, deleteOneById };
