import Faker from 'faker'

generateFakeData()
const generateFakeData = () => {
    const className = Faker.name.jobTitle.name();
    console.log(className);
    
}