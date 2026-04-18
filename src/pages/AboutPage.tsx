import { SectionIntro } from '../components/ui/SectionIntro';

export function AboutPage() {
  return (
    <section className="container page-section narrow">
      <SectionIntro
        eyebrow="About the project"
        title="Paradise Hotel frontend coursework"
        text="This application is a React frontend built for the Paradise Hotel API. It demonstrates public browsing, authenticated booking flows, role-based route protection and an administrative area for hotel management."
      />
      <div className="panel prose">
        <p>
          The project uses the supplied backend as the source of truth for authentication, locations, room availability, reservations and reporting. The main focus is a clean component structure, clear navigation, responsive layout and safe integration with the API contract.
        </p>
        <p>
          The interface is divided into three major user experiences: guests who browse and search rooms, authenticated users who manage their own reservations, and administrators who work with dashboards and locations management.
        </p>
      </div>
    </section>
  );
}
