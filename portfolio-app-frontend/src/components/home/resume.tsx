import '@fortawesome/fontawesome-free/css/all.min.css';

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
    <dl>
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
            <h2>{item.year}</h2>
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
            <h2>{item.role}</h2>
            <div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="company-link"
              >
                {item.company}
                <i className="fa-solid fa-link"></i>
              </a>
            </div>
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
