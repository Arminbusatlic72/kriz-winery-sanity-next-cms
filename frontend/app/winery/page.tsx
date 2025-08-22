import WineryLayout from '../layouts/WineryLayout'

export default function VineyardsPage() {
  const vineyardsContent = {
    title: 'Our Vineyards',
    headerImage: '/static/images/winery/Vinarija-Kriz-272.jpg',
    content:
      'Welcome to our vinnary. We produce high-quality wines using traditional methods combined with modern techniques. Enjoy a tour through our vineyards and learn about the passion behind every bottle.',
    sectionImage: '/static/images/winery/Vinarija-Kriz-51.jpg',

    sectionImage1: '/static/images/winery/Vinarija-Kriz-215.jpg',
  }

  return <WineryLayout content={vineyardsContent} />
}
