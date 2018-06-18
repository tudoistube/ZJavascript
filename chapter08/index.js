var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var dbUrl = 'mongodb://dbuser0100:dbuser0100@ds163850.mlab.com:63850/humanresources';

db.on('error', function () {
  console.log('there was an error communicating with the database');
});

var TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});
var Team = mongoose.model('Team', TeamSchema);

var EmployeeSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  image: {
    type: String,
    default: 'images/user.png'
  },
  address: {
    lines: {
      type: [String]
    },
    postal: {
      type: String
    }
  }
});
var Employee = mongoose.model('Employee', EmployeeSchema);

function insertTeams (callback) {
  Team.create({
    name: 'Product Development'
  }, {
    name: 'Dev Ops'
  }, {
    name: 'Accounting'
  }, function (error, pd, devops, acct) {
    if (error) {
      return callback(error);
    } else {
      console.info('teams successfully added')
      callback(null, pd, devops, acct);
    }
  });
}

function insertEmployees (pd, devops, acct, callback) {
  Employee.create({
    name: {
      first: 'John',
      last: 'Adams'
    },
    team: pd._id,
    address: {
      lines: ['2 Lincoln Memorial Cir NW'],
      postal: '20037'
    }
  }, {
    name: {
      first: 'Thomas',
      last: 'Jefferson'
    },
    team: devops._id,
    address: {
      lines: ['1600 Pennsylvania Avenue', 'White House'],
      postal: '20500'
    }
  }, {
    name: {
      first: 'James',
      last: 'Madison'
    },
    team: acct._id,
    address: {
      lines: ['2 15th St NW', 'PO Box 8675309'],
      postal: '20007'
    }
  }, {
    name: {
      first: 'James',
      last: 'Monroe'
    },
    team: acct._id,
    address: {
      lines: ['1850 West Basin Dr SW', 'Suite 210'],
      postal: '20242'
    }
  }, function (error, johnadams) {
    if (error) {
      return callback(error);
    } else {
      console.info('employees successfully added');
      callback(null, {
        team: pd,
        employee: johnadams
      });
    }
  })
}


mongoose.connect(dbUrl, function (err) {
  if (err) {
    return console.log('there was a problem connecting to the database!' + err);
  }
  console.log('connected!');

  //...135p.간단한 리팩토링으로 여러 데이터 추가(비동기).
  insertTeams(function (err, pd, devops, acct) {
    if (err) {
      return console.log(err)
    }
    insertEmployees(pd, devops, acct, function (err, result) {
        if (err) {
          console.error(err);
        } else {
          console.info('database activity complete')
        }

        db.close();
        process.exit();
        
    });
  });

});
