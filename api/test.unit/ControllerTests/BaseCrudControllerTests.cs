using App.Models;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Test.Unit.Dummies;

namespace Test.Unit.ContollerTests;

public sealed class BaseCrudControllerTests
{
    private BaseCrudController<DummyInsertModel, DummyViewModel> Controller;
    private Mock<IBaseService<DummyInsertModel, DummyViewModel>> MockService = new();
    private Guid Id = Guid.NewGuid();
    private IQueryable<DummyViewModel> TestViewModels;

    private DummyViewModel TestViewModel;
    private DummyEntity TestEntity;
    private DummyInsertModel TestInsertionModel;

    public BaseCrudControllerTests()
    {
        TestViewModel = new DummyViewModel() { MyProperty = 1, Id = Id };
        TestInsertionModel = new DummyInsertModel() { MyProperty = 1 };
        TestEntity = new DummyEntity() { MyProperty = 1, Id = Id };

        TestViewModels = Enumerable.Range(1, 5).Select(x => new DummyViewModel { MyProperty = x, Id = Guid.NewGuid() }).ToList().AsQueryable();

        MockService.Setup(x => x.List()).Returns(TestViewModels).Verifiable();
        MockService.Setup(x => x.Get(It.IsAny<Guid>())).Returns(TestViewModel).Verifiable();
        MockService.Setup(x => x.Add(It.IsAny<DummyInsertModel>())).Returns(TestViewModel).Verifiable();


        Mock<BaseCrudController<DummyInsertModel, DummyViewModel>> mockController = new Mock<BaseCrudController<DummyInsertModel, DummyViewModel>>(MockBehavior.Default, MockService.Object) { CallBase = true };
        Controller = mockController.Object;
    }

    [Fact]
    public void List_Should_Return()
    {
        var result = Controller.List().Result as OkObjectResult;

        MockService.Verify(x => x.List(), Times.Once);
        var page = result.Value as PagedResult<DummyViewModel>;
        page.TotalRecords.Should().Be(TestViewModels.Count());
        page.Data.Should().BeEquivalentTo(TestViewModels);
    }

    [Fact]
    public void Get_Should_Return()
    {
        var result = Controller.Get(Id).Result as OkObjectResult;

        MockService.Verify(x => x.Get(Id), Times.Once);
        var model = result.Value as DummyViewModel;
        model.Should().Be(TestViewModel);
    }

    [Fact]
    public void Add_Should_AddAndReturn()
    {
        var result = Controller.Add(TestInsertionModel);

        MockService.Verify(x => x.Add(TestInsertionModel), Times.Once);
        result.Should().BeOfType<CreatedResult>();
        var insertedModel = result.Value as DummyViewModel;
        insertedModel.Should().Be(TestViewModel);
        result.Location.Should().Be("/" + Id.ToString());
    }

    [Fact]
    public void Update_Should_Update()
    {
        var result = Controller.Update(Id, TestInsertionModel);
        
        MockService.Verify(x => x.Update(Id, TestInsertionModel), Times.Once);
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
