using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;
using System.Web.Mvc;
using System.Web.Security;
using System.Web.SessionState;

namespace PuttyColors
{
	public class Global : HttpApplication
	{
		protected void Application_Start(object sender, EventArgs e)
		{
			RouteTable.Routes.MapRoute("Default", "{*url}", new { Controller = "Default", Action = "Index" });
		}
	}

	public class DefaultController : Controller
	{
		public ActionResult Index()
		{
			return File(Server.MapPath("index.html"), "text/html");
		}
	}
}