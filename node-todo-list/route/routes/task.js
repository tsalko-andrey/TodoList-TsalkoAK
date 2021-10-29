const { Task } = require("../../models");
const router = require("../router.js");
const events = require("events");

const emitter = new events.EventEmitter();

router.route("/messageLongPolling").get((req, res) => {
  emitter.once("newTaskEvent", (task) => {
    res.json(task);
  });
});

router.route("/swapTask").put((req, res) => {
  const { todoSwap } = req.body;
  console.log(todoSwap);
  todoSwap.forEach((task, index) => {
    Task.updateOne({ id: task.id }, { order: task.order }, {}, (err, test) => {
      if (err) {
        res.status(500).json("It can't be updated at this moment!");
      } else {
        if (index === todoSwap.length - 1) {
          const tasks = {
            todoSwap,
            type: "PutSwapTask",
          };
          emitter.emit("newTaskEvent", tasks);
          res.status(200).json("success");
        }
      }
    });
  });
});

router
  .route("/task")
  .get((req, res) => {
    Task.find({}, (err, data) => {
      if (err) throw err;
      const filteredTask = [];
      data.forEach((item) => {
        filteredTask.push(item);
      });
      res.json({ filteredTask, status: 200 });
    });
  })
  .post(async (req, res) => {
    const { id, order, enter, state } = req.body;
    try {
      const task = new Task({
        id,
        order,
        enter,
        state,
      });
      await task.save();
      const newTask = {
        id,
        order,
        enter,
        state,
        type: "PostTask",
      };
      emitter.emit("newTaskEvent", newTask);
      res.status(201).json("Task was created");
    } catch (error) {
      res.status(500).json({ message: "An error happened" });
    }
  })
  .put(async (req, res) => {
    const { id, order, enter, state } = req.body;
    Task.updateOne({ id: id }, { order, enter, state }, {}, (err, test) => {
      if (err) {
        res.status(500).json("It can't be updated at this moment!");
      } else {
        const task = {
          id,
          order,
          enter,
          state,
          type: "PutTask",
        };
        emitter.emit("newTaskEvent", task);
        res.status(200).json("success");
      }
    });
  })
  .delete((req, res) => {
    const { id } = req.body;
    console.log(id);
    Task.deleteOne({ id: id }, {}, (err) => {
      if (err) {
        res.status(500).json("Resource can't be deleted!");
      } else {
        const deleteTask = {
          id,
          type: "DeleteTask",
        };
        emitter.emit("newTaskEvent", deleteTask);
        res.status(200).json({ id: id, text: "deleted successfully" });
      }
    });
  });

module.exports = router;