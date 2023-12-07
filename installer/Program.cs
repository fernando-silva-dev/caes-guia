using System.Diagnostics;
using System.Text;

string fileName = "./docker-compose.yml";

string fileContent = "services:\n  api:\n    image: fernandoss/caes-guia-backend:v0.7.0-alpha\n    container_name: api\n    ports:\n      - \"5000:5000\"\n    depends_on:\n      - database\n    environment:\n      connectionstrings__default_connection: \"Server=database;Port=5432;Database=caes-guia;User Id=postgres;Password=admin;\"\n      TOKEN_KEY: \"2441bdde-5984-4e0a-9c76-7aa6aa1f9736\"\n\n  app:\n    image: fernandoss/caes-guia-frontend:v0.7.0-alpha\n    container_name: app\n    depends_on:\n      - api\n    ports:\n      - \"3000:3000\"\n    command: \"npm start\"\n\n  database:\n    image: postgres\n    container_name: database\n    ports: \n      - \"5432:5432\"\n    restart: always\n    volumes:\n      - db_volume:/var/lib/postgresql/data/\n    environment:\n      - POSTGRES_USER=postgres\n      - POSTGRES_PASSWORD=admin\n      - POSTGRES_DB=caes-guia\n\nvolumes:\n  db_volume:\n";

// Create a new file
using (FileStream fs = File.Create(fileName))
{
    // Add some text to file
    Byte[] title = new UTF8Encoding(true).GetBytes(fileContent);
    fs.Write(title, 0, title.Length);
}

Process cmd = new();
cmd.StartInfo.FileName = "bash";
cmd.StartInfo.RedirectStandardInput = true;
cmd.StartInfo.RedirectStandardOutput = true;
cmd.StartInfo.CreateNoWindow = false;
cmd.StartInfo.UseShellExecute = false;
cmd.Start();

// docker-compose up e tals
cmd.StandardInput.WriteLine("docker-compose up");
cmd.StandardInput.Flush();
cmd.StandardInput.Close();
cmd.WaitForExit();
Console.WriteLine(cmd.StandardOutput.ReadToEnd());
