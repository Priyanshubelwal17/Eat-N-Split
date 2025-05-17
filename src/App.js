import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Anuj",
    image: "images/anuj-user5.jpg",
    balance: -7,
  },
  {
    id: 933372,
    name: "Aditya",
    image: "images/aditya-user4.jpg",
    balance: 20,
  },
  {
    id: 499476,
    name: "Ashmit",
    image: "images/ashmit-user2.jpg",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {showAddFriend && <FormAddFriend />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      <FormSplitBill />
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
        <p>You and {f.name} are even</p>
      )}
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👯 Friend name</label>
      <input type="text" />
      <label>🌄 Image URL</label>
      <input type="text" />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a ball with X</h2>

      <label>💸 Bill value</label>
      <input type="text" />

      <label>🧍‍♂️ Your expense</label>
      <input type="text" />

      <label>🧑🏿‍🤝‍🧑🏿 X's expense</label>
      <input type="text" disabled />

      <label>🤑 Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
