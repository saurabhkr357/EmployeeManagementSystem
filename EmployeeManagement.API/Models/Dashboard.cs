namespace EmployeeManagement.API.Models
{
    public class Dashboard
    {
        public int TotalEmployees { get; set; }

        public int TotalPayroll { get; set; }

        public int PresentToday { get; set; }

        public int AbsentToday { get; set; }
    }
}