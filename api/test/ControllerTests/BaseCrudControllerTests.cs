using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Test.Dummies;

namespace Test.ContollerTests;

public sealed class BaseCrudControllerTests
{
    private BaseCrudController<DummyInsertModel, DummyViewModel> Controller;
    private Mock<IBaseService<DummyInsertModel, DummyViewModel>> MockService = new();
    private Guid Id = Guid.NewGuid();
    private IQueryable<DummyViewModel> TestViewModels = Enumerable.Range(1, 5).Select(x => new DummyViewModel { MyProperty = x, Id = Guid.NewGuid() }).AsQueryable();

    private DummyViewModel TestViewModel;
    private DummyEntity TestEntity;
    private DummyInsertModel TestInserModel;

    public BaseCrudControllerTests()
    {
        TestViewModel = new DummyViewModel() { MyProperty = 1, Id = Id };
        TestInserModel = new DummyInsertModel() { MyProperty = 1 };
        TestEntity = new DummyEntity() { MyProperty = 1, Id = Id };

        MockService.Setup(x => x.List()).Returns(TestViewModels).Verifiable();
        MockService.Setup(x => x.Add(It.IsAny<DummyInsertModel>())).Returns(TestViewModel).Verifiable();

        Controller = new Mock<BaseCrudController<DummyInsertModel, DummyViewModel>>(MockBehavior.Default, MockService.Object) { CallBase = true }.Object;
    }

    [Fact]
    public void List_Should_Return()
    {
        var result = Controller.List();

        MockService.Verify(x => x.List(), Times.Once);
        result.Should().BeOfType<ActionResult<App.Models.PagedResult<DummyViewModel>>>();
    }

    [Fact]
    public void Get_Should_Return()
    {
        var result = Controller.Get(Id);

        MockService.Verify(x => x.Get(Id), Times.Once);
        result.Should().BeOfType<ActionResult<DummyViewModel>>();
    }

    [Fact]
    public void Add_Should_AddAndReturn()
    {
        var result = Controller.Add(TestInserModel);

        MockService.Verify(x => x.Add(TestInserModel), Times.Once);
        result.Should().BeOfType<CreatedResult>();
    }

    [Fact]
    public void Update_Should_Update()
    {
        var result = Controller.Update(Id, TestInserModel);
        
        MockService.Verify(x => x.Update(Id, TestInserModel), Times.Once);
        result.Should().BeOfType<NoContentResult>();
    }

    [Fact]
    public void Remove_Should_Remove()
    {
        var result = Controller.Remove(Id);
        
        MockService.Verify(x => x.Remove(Id), Times.Once);
        result.Should().BeOfType<NoContentResult>();
    }
}
