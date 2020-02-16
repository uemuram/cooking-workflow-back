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

const beefBowl = {
  title: "牛丼",
  description: "薄く切った牛肉とタマネギなどを醤油などで甘辛く煮込み、丼に盛った飯の上に載せた料理",
  containers: {
    pot1: {
      type: "pot",
    },
    riceBowl1: {
      type: "riceBowl",
    }
  },
  materials: {
    rice1: {
      type: "rice",
      quantity: [
        {
          amount: 1,
          unit: "go"
        }
      ]
    },
    water1: {
      type: "water",
      quantity: [
        {
          amount: 150,
          unit: "ml"
        }
      ]
    },
    sugar1: {
      type: "sugar",
      quantity: [
        {
          amount: 1,
          unit: "tbsp"
        }
      ]
    },
    soySauce1: {
      type: "soySauce",
      description: "一般的なこいくち醤油",
      quantity: [
        {
          amount: 3,
          unit: "tbsp"
        }
      ]
    },
    mirin1: {
      type: "mirin",
      quantity: [
        {
          amount: 3,
          unit: "tbsp"
        }
      ]
    },
    ginger_tube1: {
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
      description: "薄く細切りの牛バラ肉",
      quantity: [
        {
          amount: 200,
          unit: "g"
        }
      ]
    },
    onion1: {
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
      source: "rice1",
      description: "炊飯器で米を炊く。"
    },
    makeBroth: {
      title: "煮汁を作る",
      type: "add",
      source: [
        "water1",
        "sugar1",
        "soySauce1",
        "mirin1",
        "ginger_tube1"
      ],
      target: "pot1",
      description: "各調味料を計量し、鍋に入れる。"
    },
    cutBeefRib: {
      type: "cut",
      source: "beefRib",
      description: "長辺5センチ程度になるようにカットする。大きさを揃えておくと、味の染み込み具合や食感を均一にできる。"
    },
    peelOnion: {
      type: "peel",
      source: "onion1",
      description: "2分割して固いところを切り落とした後、素手で皮をむく。"
    },
    cutOnion: {
      type: "cut",
      source: "onion1",
      description: "繊維と平行に、幅1センチ程度になるようにスライスする。",
      depend: "peelOnion"
    },
    boil: {
      type: "bringToABoil",
      source: "pot1",
      description: "調味料が入った鍋を強火で沸騰させる。",
      depend: "makeBroth"
    },
    addBeefRibToPot: {
      type: "add",
      source: "beefRib",
      target: "pot1",
      description: "中火に変更し、牛肉を加えて解きほぐす。",
      depend: ["cutBeefRib", "boil"]
    },
    stew1: {
      type: "stew",
      source: "pot1",
      until: {
        type: "time",
        value: 5
      },
      description: "中火のまま5分間煮込む。灰汁が気になる場合は取り除いておく。",
      depend: "addBeefRibToPot"
    },
    addOnionToPot: {
      type: "add",
      source: "onion1",
      target: "pot1",
      description: "玉ねぎを鍋に投入する。",
      depend: ["cutOnion", "stew1"]
    },
    stew2: {
      type: "stew",
      source: "pot1",
      until: {
        type: "time",
        value: 10
      },
      description: "弱火に変更して煮込む。玉ねぎの透明度が増し、その後茶色く変色していくことを確認する。",
      depend: "addOnionToPot"
    },
    serve: {
      type: "serve",
      source: [
        "rice1",
        "pot1"
      ],
      target: "riceBowl1",
      description: "どんぶりにご飯と具材を盛り付ける。",
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
