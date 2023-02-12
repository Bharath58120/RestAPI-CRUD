import fs from "fs";
let users = [];
fs.readFile("user.json", "utf-8", (err, data) => {
  if (err) throw err;
  let jsonData = JSON.parse(data);
  for (let i = 0; i < jsonData.length; i++) {
    users.push(jsonData[i]);
  }
  // console.log(users);
});
export const getUsers = (req, res) => {
  console.log(users);
  res.send(users);
};

export const createUser = (req, res) => {
  // console.log("posted");
  const user = req.body;
  users.push({ ...user });
  res.send(users);
  const arrayAsJson = JSON.stringify(users);
  fs.writeFileSync("user.json", arrayAsJson);
};
export const getUser = (req, res) => {
  const Id = req.params.Id;
  const item = users.find((item) => parseInt(item.id) === parseInt(Id));
  if (!item)
    return res.status(404).send("The item with the given ID was not found.");
  res.send(item);
};
export const deleteuser = (req, res) => {
  const Id = req.params.Id;
  fs.readFile("user.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send({ error: "Error reading the items file" });
    } else {
      try {
        const items = JSON.parse(data);
        // console.log(items);
        const itemInde = items.findIndex(
          (item) => parseInt(item.id) === parseInt(Id)
        );
        let itemIndex = itemInde === 0 ? itemInde + 1 : itemInde;
        console.log(itemIndex);
        if (itemIndex === -1) {
          res.status(404).send({ error: "Item not found" });
        } else {
          itemInde === 0 ? items.splice(0, 1) : items.splice(itemIndex, 1);
          console.log(items);
          const arrayAsJson = JSON.stringify(items);
          fs.writeFileSync("user.json", arrayAsJson);
        }
      } catch (e) {
        res.status(500).send({ error: "Error parsing the items file" });
      }
    }
  });
};

export const updateUser = (req, res) => {
  const Id = req.params.Id;
  let itemInde;
  fs.readFile("user.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send({ error: "Error reading the items file" });
    } else {
      try {
        const it = JSON.parse(data);
        itemInde = it.findIndex((item) => parseInt(item.id) === parseInt(Id));
        let itemIndex = itemInde === 0 ? itemInde + 1 : itemInde;
        if (itemIndex === -1) {
          res.status(404).send({ error: "Item not found" });
        } else {
          it[itemInde].title = req.body.title;
          const arrayAsJson = JSON.stringify(it);
          fs.writeFileSync("user.json", arrayAsJson);
        }
      } catch (e) {
        res.status(500).send({ error: "Error parsing the items file" });
      }
    }
  });
};
