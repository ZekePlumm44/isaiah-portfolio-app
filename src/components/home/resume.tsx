export default function Resume() {
    const timelineData = [
        {
            year: "2021",
            present: false,
            role: "Software Engineer",
            company: "General Motors",
            location: "Atlanta, GA",
            link: "https://www.gm.com/",
        }
    ];
    return (
        <dl className="resume-container">
            {timelineData.map((item, index) => (
            <div className="list-container" key={index}>
                <dt className="list-title" id="timeline-year">
                    <h2>{item.year}</h2>
                    {item.present && <span className="present-tag">Present</span>}
                </dt>
                <dd className="list-content" id="timeline-role">
                    <h2>{item.role}</h2>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">{item.company} ↗</a>
                    <p>{item.location}</p>
                </dd>
            </div>
            ))}
        </dl>
    );
}