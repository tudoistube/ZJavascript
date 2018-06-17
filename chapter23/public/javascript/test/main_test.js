describe('main controller', function() {
  beforeEach(module('app'));
  var _scope;
  var _httpBackend;

  beforeEach(inject(function($controller, $rootScope, EmployeeService, $httpBackend) {
    _scope = $rootScope.$new();
    _httpBackend = $httpBackend;

    $httpBackend.when('GET', '/employees').respond([{
      first: 'Abraham',
      last: 'Lincoln'
    }, {
      first: 'Andrew',
      last: 'Johnson'
    }]);

    $httpBackend.when('POST', '/employees').respond({
      first: 'Grover',
      last: 'Cleveland',
    });

    $controller('main', {
      $scope: _scope,
      EmployeeService: EmployeeService
    });
  }));

  // 테스트 1
  it('should not allow add initially', function () {
    expect(_scope.addDisabled()).to.equal(true);
  });

  // 테스트 2
  it('should allow add when firstName and lastName have been set', function() {
    _scope.firstName = 'Grover' ;
    _scope.lastName = 'Cleveland';
    expect(_scope.addDisabled()).to.equal(false);
  });
  // 테스트 3
  it('should have a list of employees after the "get" call is complete', function () {
    _httpBackend.flush();
    expect(_scope.employees.length).to.equal(2);
  });
  // 테스트 4
  it('should return the new item after adding and disable the add button', function () {
    _httpBackend.flush();
    _scope.firstName = 'Grover' ;
    _scope.lastName = 'Cleveland';
    _scope.add();
    _httpBackend.flush();
    expect(_scope.employees.length).to.equal(3);

    var result = _scope.employees[2];
    expect(result.first).to.equal('Grover');
    expect(result.last).to.equal('Cleveland');

    expect(_scope.addDisabled()).to.equal(true);
  });
});
