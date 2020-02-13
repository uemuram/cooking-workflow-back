/*
// Express利用しない版
var port = process.env.PORT || 8000;
var http = require("http");
http.createServer(function (request, response) {
   response.writeHead(200, {"Content-Type": "text/plain"});
   response.end("Hello World7");
}).listen(port);
*/

const express = require('express');
const app = express();

// CORS設定。異なるドメインからでも呼び出せるようにする
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// 起動している箇所
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.use(express.json());

// DBの代わり
const courses = [
  { id: 1, name: 'computer science' },
  { id: 2, name: 'information technology' },
  { id: 3, name: 'business intelligence' },
];

const test2 = {
  title: "テスト2",
  description: "テスト2",
  container: {},
  material: {},
  action: {
    a: {
      next: "f"
    },
    b: {
      next: ["c", "d"]
    },
    c: {
      next: "e"
    },
    d: {
      next: "e"
    },
    e: {
      next: "f"
    },
    f: {
      next: "finish"
    }
  }
};

const test3 = {
  title: "テスト3",
  description: "テスト3",
  container: {},
  material: {},
  action: {
    a: {
      next: "c"
    },
    b: {
      next: ["f", "d"]
    },
    c: {
      next: "e"
    },
    d: {
      next: ["f", "g"]
    },
    e: {
      next: "finish"
    },
    f: {
      next: "h"
    },
    g: {
      next: ["i", "j"]
    },
    h: {
      next: "k"
    },
    i: {
      next: "m"
    },
    j: {
      next: "m"
    },
    k: {
      next: "l"
    },
    l: {
      next: "m"
    },
    m: {
      next: "finish"
    }
  }
};

const test4 = {
  title: "xx料理",
  description: "yyをzzした料理です",
  containers: {},
  materials: {},
  actions: {
    a: {
      next: "c"
    },
    b: {
      next: [
        "d"
      ]
    },
    c: {
      next: ["e", "f"]
    },
    d: {
      next: [
        "g"
      ]
    },
    e: {
      next: "j"
    },
    f: {
      next: ["h", "i"]
    },
    g: {
      next: [
        "finish"
      ]
    },
    h: {
      next: "j"
    },
    i: {
      next: "k"
    },
    j: {
      next: "k"
    },
    k: {
      next: "finish"
    }
  }
};

const beefBowl = {
  title: "牛丼",
  description: "薄く切った牛肉とタマネギなどを醤油などで甘辛く煮込み、丼に盛った飯の上に載せた料理",
  containers: {
    pot: {
      type: "pot",
    },
    riceBowl: {
      type: "riceBowl",
    }
  },
  materials: {
    rice: {
      type: "rice",
      quantity: [
        {
          amount: 1,
          unit: "go"
        }
      ]
    },
    water: {
      type: "water",
      quantity: [
        {
          amount: 150,
          unit: "ml"
        }
      ]
    },
    sugar: {
      type: "sugar",
      quantity: [
        {
          amount: 1,
          unit: "tbsp"
        }
      ]
    },
    soySauce: {
      type: "soySauce",
      quantity: [
        {
          amount: 3,
          unit: "tbsp"
        }
      ]
    },
    mirin: {
      type: "mirin",
      quantity: [
        {
          amount: 3,
          unit: "tbsp"
        }
      ]
    },
    ginger_tube: {
      type: "ginger_tube",
      quantity: [
        {
          amount: 1,
          unit: "cm"
        }
      ]
    },
    beefRib: {
      title: "牛バラ肉",
      type: "beef",
      quantity: [
        {
          amount: 200,
          unit: "g"
        }
      ]
    },
    onion: {
      type: "onion",
      quantity: [
        {
          amount: 0.5,
          unit: "pieces"
        },
        {
          amount: 100,
          unit: "g"
        }
      ]
    }

  },
  actions: {
    cookRice: {
      type: "cookRice",
      source: "rice",
      comment: "米を炊く"
    },
    makeBroth: {
      title: "煮汁を作る",
      type: "add",
      source: [
        "water",
        "sugar",
        "soySauce",
        "mirin",
        "ginger_tube"
      ],
      target: "pot",
      comment: "煮汁を作る"
    },
    cutBeefRib: {
      type: "cut",
      source: "beefRib",
      comment: "牛ばら肉を切る"
    },
    peelOnion: {
      type: "peel",
      source: "onion",
      comment: ""
    },
    cutOnion: {
      type: "cut",
      source: "onion",
      comment: "玉ねぎを1cm幅に切る",
      depend: "peelOnion"
    },
    boil: {
      type: "bringToABoil",
      source: "pot",
      comment: "沸騰するまで茹でる",
      depend: "makeBroth"
    },
    addBeefRibToPot: {
      type: "add",
      source: "beefRib",
      target: "pot",
      comment: "牛ばら肉を鍋へ",
      depend: ["cutBeefRib", "boil"]
    },
    stew1: {
      type: "stew",
      source: "pot",
      until: {
        type: "time",
        value: 5
      },
      comment: "5分間煮込む",
      depend: "addBeefRibToPot"
    },
    addOnionToPot: {
      type: "add",
      source: "onion",
      target: "pot",
      comment: "玉ねぎを鍋へ",
      depend: ["cutOnion", "stew1"]
    },
    stew2: {
      type: "stew",
      source: "pot",
      until: {
        type: "time",
        value: 10
      },
      comment: "10分間煮込む",
      depend: "addOnionToPot"
    },
    serve: {
      type: "serve",
      source: [
        "rice",
        "pot"
      ],
      target: "riceBowl",
      comment: "米と具を盛り付ける",
      depend: ["cookRice", "stew2"]
    }
  }
};

// GET /
app.get('/', (req, res) => {
  res.send('Simple REST API');
});

// GET /api/courses
app.get('/api/courses', (req, res) => {
  console.log("/api/courses");
  res.send(courses);
});

// GET /api/recipies/beefBowl
app.get('/api/recipies/beefBowl', (req, res) => {
  console.log("/api/recipies/beefBowl");
  res.send(beefBowl);
  // res.send(test4);
});

// POST /api/courses
app.post('/api/courses', (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// PUT /api/courses/1
app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found.');

  course.name = req.body.name;
  res.send(course);
});

// DELETE /api/courses/1
app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found.');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});
