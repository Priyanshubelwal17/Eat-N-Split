const initialFriends = [
  {
    id: 118836,
    name: "Anuj",
    image: "images/anuj-user5.jpg",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "images/aditya-user4.jpg",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "images/ashmit-user2.jpg",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
      </div>
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((f) => (
        <Friend f={f} name={f.name} key={f.id} />
      ))}
    </ul>
  );
}

function Friend({ f, name }) {
  return (
    <li>
      <img src={f.image} alt={f.name} width="48" height="48" />
      <h3>{f.name}</h3>

      {f.balance < 0 ? (
        <p className="red">
          You owe {f.name} ₹{Math.abs(f.balance)}
        </p>
      ) : f.balance > 0 ? (
        <p className="green">
          {f.name} owes you ₹{Math.abs(f.balance)}
        </p>
      ) : (
        <p className="">You and {f.name} are even</p>
      )}
      <button className="button">Select</button>
    </li>
  );
}
