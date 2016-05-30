const EventEmitter = require('events');

let grudges = [];

const store = new EventEmitter();

store.create = ({name, offense}) => {
  grudges = grudges.concat({name, offense, status: "not forgiven", id: Date.now()});
  store.emit('change', grudges)
};

store.all = () => {
  const stored = localStorage.getItem('grudges');
  if (stored) { grudges = JSON.parse(stored); }
  return grudges.concat([]);
};

store.update = (id, data) => {
  grudges = grudges.map(grudge => {
    if (grudge.id !== id) { return grudge; }
    return Object.assign(grudge, data);
  })
  store.emit('change', grudges);
}

store.filterGrudges = (search) => {
  const filtered = store.all().filter(function(grudge) {
    return grudge.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
           grudge.offense.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });
  store.emit('change', filtered);
}

store.on('change', () =>{
  localStorage.setItem('grudges', JSON.stringify(grudges));
});

module.exports = store;
