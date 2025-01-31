export default function Resume() {
  const timelineData = [
    {
      year: '2021',
      present: false,
      role: 'Software Engineer, Customer Care and Aftersales',
      company: 'General Motors',
      location: 'Atlanta, GA',
      link: 'https://www.gm.com/',
    },
    {
      year: '2017',
      present: false,
      role: 'Student, Computer Engineering',
      company: 'Syracuse University',
      location: 'Syracuse, NY',
      link: 'https://www.syracuse.edu/',
    },
  ];

  return (
    <dl className="resume-container">
      {timelineData.map((item, index) => (
        <div className="container" key={index}>
          <dt
            className="left-item"
            id="timeline-year"
            style={{
              borderBottom:
                index === timelineData.length - 1
                  ? '0.03125rem solid rgba(170, 170, 170, 0.5)'
                  : 'none',
            }}
          >
            <h3>{item.year}</h3>
            {item.present && <span className="present-tag">Present</span>}
          </dt>
          <dd
            className="right-item"
            id="timeline-role"
            style={{
              borderBottom:
                index === timelineData.length - 1
                  ? '0.03125rem solid rgba(170, 170, 170, 0.5)'
                  : 'none',
            }}
          >
            <h3>{item.role}</h3>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.company} ↗
            </a>
            <p
              style={{
                marginBottom:
                  index === timelineData.length - 1 ? '4rem' : 'none',
              }}
            >
              {item.location}
            </p>
          </dd>
        </div>
      ))}
    </dl>
  );
}
