const statusColors = {
  Open: "bg-green-100 text-green-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Closed: "bg-red-100 text-red-800",
};

const TicketTable = ({ data }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="px-4 py-2">Ticket ID</th>
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Priority</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Assignee</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ticket) => {
            const statusStyle = statusColors[ticket.status] || "bg-gray-200 text-gray-800";

            return (
              <tr key={ticket.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{ticket.id}</td>
                <td className="px-4 py-2">{ticket.title || ticket.subject || "N/A"}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyle}`}
                  >
                    {ticket.status || "Unknown"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {ticket.createdAt?.toDate
                    ? ticket.createdAt.toDate().toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-4 py-2">{ticket.priority || "N/A"}</td>
                <td className="px-4 py-2">{ticket.department || "N/A"}</td>
                <td className="px-4 py-2">{ticket.assignee || "Unassigned"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
