using Domain.Interfazes.Repository;
using Test.Dummies;

namespace Test.ServiceTests;

public sealed class BaseServiceTests
{
    private readonly Mock<IBaseRepository<DummyEntity>> RepositoryMock = new();
    private readonly Mock<IMapper> MapperMock = new();
    private readonly BaseService<DummyEntity, DummyInsertModel, DummyViewModel> Service;
    private IQueryable<DummyEntity> TestEntities = Enumerable.Range(1, 5).Select(x => new DummyEntity { MyProperty = x }).AsQueryable();
    private DummyEntity TestEntity;
    private DummyViewModel TestViewModel;
    private DummyInsertModel TestInsertModel = new DummyInsertModel() { MyProperty = new Random().Next() };
    private Guid Id = Guid.NewGuid();
    private IQueryable<DummyViewModel> TestViewModels = Enumerable.Range(1, 5).Select(x => new DummyViewModel { MyProperty = x, Id = Guid.NewGuid() }).AsQueryable();


    public BaseServiceTests()
    {
        TestEntity = TestEntities.First();
        TestViewModel = TestViewModels.First();

        RepositoryMock.Setup(x => x.List()).Returns(TestEntities).Verifiable();
        RepositoryMock.Setup(x => x.Add(It.IsAny<DummyEntity>())).Returns(TestEntity).Verifiable();
        RepositoryMock.Setup(x => x.Get(It.IsAny<Guid>())).Returns(TestEntity).Verifiable();

        MapperMock.Setup(x => x.ProjectTo<DummyViewModel>(It.IsAny<IQueryable<DummyEntity>>(), It.IsAny<object>())).Returns(TestViewModels).Verifiable();
        MapperMock.Setup(x => x.Map<DummyEntity>(It.IsAny<DummyInsertModel>())).Returns(TestEntity).Verifiable();
        MapperMock.Setup(x => x.Map<DummyViewModel>(It.IsAny<DummyEntity>())).Returns(TestViewModel).Verifiable();

        Service = new Mock<BaseService<DummyEntity, DummyInsertModel, DummyViewModel>>(MockBehavior.Default, RepositoryMock.Object, MapperMock.Object) { CallBase = true }.Object;
    }


    [Fact]
    public void List_Should_MapAndReturn()
    {
        var result = Service.List();

        RepositoryMock.Verify(x => x.List(), Times.Once());
        MapperMock.Verify(x => x.ProjectTo<DummyViewModel>(TestEntities, It.IsAny<object>()), Times.Once());
        result.Should().BeEquivalentTo(TestViewModels);
    }

    [Fact]
    public void Add_Should_Add()
    {
        var result = Service.Add(TestInsertModel);

        MapperMock.Verify(x => x.Map<DummyEntity>(TestInsertModel), Times.Once());
        MapperMock.Verify(x => x.Map<DummyViewModel>(It.IsAny<DummyEntity>()), Times.Once());
        result.Should().Be(TestViewModel);
    }

    [Fact]
    public void Get_Should_GetById()
    {
        var result = Service.Get(Id);

        RepositoryMock.Verify(x => x.Get(Id), Times.Once());
        MapperMock.Verify(x => x.Map<DummyViewModel>(TestEntity), Times.Once());
        result.Should().BeEquivalentTo(TestViewModel);
    }

    [Fact]
    public void Update_Should_Update()
    {
        Service.Update(Id, TestInsertModel);

        MapperMock.Verify(x => x.Map<DummyEntity>(TestInsertModel), Times.Once());
        RepositoryMock.Verify(x => x.Update(Id, TestEntity), Times.Once());
    }

    [Fact]
    public void Remove_Should_Remove()
    {
        Service.Remove(Id);

        RepositoryMock.Verify(x => x.Remove(Id), Times.Once());
    }

    [Fact]
    public void EmptyConstructor_Should_Construct()
    {
        var emptyConstructedService = new Mock<BaseService<DummyEntity, DummyInsertModel, DummyViewModel>>() { CallBase = true }.Object;

        emptyConstructedService.Should().BeAssignableTo<BaseService<DummyEntity, DummyInsertModel, DummyViewModel>>();
    }
}
