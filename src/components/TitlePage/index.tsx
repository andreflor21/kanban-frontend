import Helmet from 'react-helmet';

interface TitlePageProps {
    title: string;
}
const TitlePage = ({ title }: TitlePageProps) => {
    return <Helmet title={`Kanban | ${title}`} />;
};

export default TitlePage;
