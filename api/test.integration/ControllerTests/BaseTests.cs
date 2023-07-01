namespace Test.Integration.ControllerTests;

public class BaseTests
{
    protected readonly TestContext TestContext;
    public BaseTests()
    {
        TestContext = new TestContext();
    }
}