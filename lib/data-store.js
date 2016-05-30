const EventEmitter = require('events');

let grudges = [];

const store = new EventEmitter();

const storedGrudges = localStorage.getItem('grudges');
if (storedGrudges) { grudges = JSON.parse(storedGrudges); }

store.create = ({name, offense}) => {
  grudges = grudges.concat({name, offense, status: "not forgiven", id: Date.now()});
  store.emit('change', grudges)
};

store.all = () => grudges.concat([]);

store.update = (id, data) => {
  grudges = grudges.map(grudge => {
    if (grudge.id !== id) { return grudge; }
    return Object.assign(grudge, data);
  })
  store.emit('change', grudges);
}

store.on('change', () =>{
  localStorage.setItem('grudges', JSON.stringify(grudges));
});

module.exports = store;
