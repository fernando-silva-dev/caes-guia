using Domain.Interfazes.Repository;

namespace Test.ServiceTests;


#region Test types
public class TestEntity : BaseEntity
{
    public int MyProperty { get; set; }
}

public class TestInsertModel
{
    public int MyProperty { get; set; }
}

public class TestViewModel : BaseViewModel
{
    public int MyProperty { get; set; }
}

#endregion

public sealed class BaseServiceTests
{
    private readonly Mock<IBaseRepository<TestEntity>> RepositoryMock = new();
    private readonly Mock<IMapper> MapperMock = new();
    private readonly BaseService<TestEntity, TestInsertModel, TestViewModel> Service;
    private IQueryable<TestEntity> TestEntities = Enumerable.Range(1, 5).Select(x => new TestEntity { MyProperty = x }).AsQueryable();
    private TestEntity TestEntity;
    private TestViewModel TestViewModel;
    private TestInsertModel TestInsertModel = new TestInsertModel() { MyProperty = new Random().Next() };
    private Guid Id = Guid.NewGuid();
    private IQueryable<TestViewModel> TestViewModels = Enumerable.Range(1, 5).Select(x => new TestViewModel { MyProperty = x, Id = Guid.NewGuid() }).AsQueryable();


    public BaseServiceTests()
    {
        TestEntity = TestEntities.First();
        TestViewModel = TestViewModels.First();

        RepositoryMock.Setup(x => x.List()).Returns(TestEntities).Verifiable();
        RepositoryMock.Setup(x => x.Add(It.IsAny<TestEntity>())).Returns(TestEntity).Verifiable();
        RepositoryMock.Setup(x => x.Get(It.IsAny<Guid>())).Returns(TestEntity).Verifiable();

        MapperMock.Setup(x => x.ProjectTo<TestViewModel>(It.IsAny<IQueryable<TestEntity>>(), It.IsAny<object>())).Returns(TestViewModels).Verifiable();
        MapperMock.Setup(x => x.Map<TestEntity>(It.IsAny<TestInsertModel>())).Returns(TestEntity).Verifiable();
        MapperMock.Setup(x => x.Map<TestViewModel>(It.IsAny<TestEntity>())).Returns(TestViewModel).Verifiable();

        Service = new Mock<BaseService<TestEntity, TestInsertModel, TestViewModel>>(MockBehavior.Default, RepositoryMock.Object, MapperMock.Object) { CallBase = true }.Object;
    }


    [Fact]
    public void List_Should_MapAndReturn()
    {
        var result = Service.List();

        RepositoryMock.Verify(x => x.List(), Times.Once());
        MapperMock.Verify(x => x.ProjectTo<TestViewModel>(TestEntities, It.IsAny<object>()), Times.Once());
        result.Should().BeEquivalentTo(TestViewModels);
    }

    [Fact]
    public void Add_Should_Add()
    {
        var result = Service.Add(TestInsertModel);

        MapperMock.Verify(x => x.Map<TestEntity>(TestInsertModel), Times.Once());
        MapperMock.Verify(x => x.Map<TestViewModel>(It.IsAny<TestEntity>()), Times.Once());
        result.Should().Be(TestViewModel);
    }

    [Fact]
    public void Get_Should_GetById()
    {
        var result = Service.Get(Id);

        RepositoryMock.Verify(x => x.Get(Id), Times.Once());
        MapperMock.Verify(x => x.Map<TestViewModel>(TestEntity), Times.Once());
        result.Should().BeEquivalentTo(TestViewModel);
    }

    [Fact]
    public void Update_Should_Update()
    {
        Service.Update(Id, TestInsertModel);

        MapperMock.Verify(x => x.Map<TestEntity>(TestInsertModel), Times.Once());
        RepositoryMock.Verify(x => x.Update(Id, TestEntity), Times.Once());
    }

    [Fact]
    public void Remove_Should_Remove()
    {
        Service.Remove(Id);

        RepositoryMock.Verify(x => x.Remove(Id), Times.Once());
    }
}
