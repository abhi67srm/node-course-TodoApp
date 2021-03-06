const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todos');

// dummy todos
const todos = [{
    _id:new ObjectId(),
    text: 'First test todo'
},{
    _id: new ObjectId(),
    text:'Second test todo',
    completed: true,
    completedAt:333
}];
//Adding testing life cycle
beforeEach((done)=>{
   Todo.remove({}).then(()=>{
       return Todo.insertMany(todos);
   }).then(()=>done());
});

describe('POST/todos', ()=>{
   it('should create a new todo', (done)=>{
       var text = 'text todo text';
       request(app)
       .post('/todos')
       .send({text})
       .expect(200)
       .expect((res)=>{
             expect(res.body.text).toBe(text);
       })
       .end((err, res)=>{
          if(err){
             return done(err);
            }

        Todo.find({text}).then((todos)=>{
             expect(todos.length).toBe(1);
             expect(todos[0].text).toBe(text);
             done();
        }).catch((e)=>done(e));
       });
   });
});

it('should not create todo with invalid body data', (done)=>{
    request('app')
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) =>{
         if(err){
             return done(err);
         }
         Todo.find().then((todos) =>{
           expect(todos.length).toBe(0);
           done();
         }).catch((e)=>done(e));
      });
});

describe('GET /todos', ()=>{
    it('should get all todos', (done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);     
    });
});

describe('GET /todos:id', ()=>{
    it('should return todo doc', (done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo not found', (done)=>{
         //make sure you get 404 back
         var hexId = new ObjectId().toHexString();
         request(app)
        .get(`/todos/${hexID}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object ids',(done)=>{
        // /todos/123
        var hexId = new ObjectId().toHexString();

        request(app)
        .get(`/todos/123abc`)
        .expect(404)
        .end(done);

    })
});

describe('DELETE /todos/:id',()=>{
  it('should remove a todo', (done)=>{
       var hexId = todos[1]._id.toHexString();
       request(app)
       .delete(`/todos/${hexId}`)
       .expect(200)
       .expect((res)=>{
              expect(res.body._id).toBe(hexId);
       }).end((err, res)=>{
           if(err) return done(err);

           Todo.findById(hexId).then((todo)=>{
               expect(todo).toNotExist();
               done();
           }).catch((e)=>done(e));

       });

  });
  
  it('should return 404 if todo not found', (done)=>{

  });
  
  it('should return 404 if ObjectId is not valid', (done)=>{
     
  });

});

//how i like you to accomplish this
//being rsourceful
describe('should update the todo', (done)=>{
    it('should update the todo', (done)=>{
      //grab id of first item
      var hexId = todos[0].id.toHexString();

      //update text, set completed true
      var text = 'This should be new text';
      //200
      request(app)
      .patch(`/todos/${hexId}`)
      .send({
          completed:true,
          text
      })
      .expect(200)
      .expect((res)=>{
         expect(res.body.todo.text).toBe(text);
         expect(res.body.todo.completed).toBe(true);
         expect(res.body.todo.completedAt).toBeA('number'); 
      })
      .end(done)
      //text is chnaged, completed is tru, completeAt is a number, toBeA
    });

    it('should clear completedAt when todo is not completed', (done)=>{
        //grab id of second todo item
        var hexId = todos[1]._id.toHexString();
        //update text, set completed to false
        var text = 'This should be new text!!!!!';
        //200
        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            completed:false,
            text
        })
        .expect(200)
        .expect((res)=>{
           expect(res.body.todo.text).toBe(text);
           expect(res.body.todo.completed).toBe(false);
           expect(res.body.todo.completedAt).toNotExist(); 
        })
        .end(done)
        //text  is changed, completed false, completed is null, toNotExist


    });
});