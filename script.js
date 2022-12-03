const cardsContainer = document.querySelector('.members-container');
const cardTemp = document.querySelector('.member-card-container');

fetch('members.json')
.then(res => res.json())
.then(
    data => {
        const { members } = data;

        members.forEach(
            (member, index) => {
                addMemberCard({...member, index: index});
            }
        );

        cardTemp.remove();
    }
)

/**
 * Add a member card with the proper data to the cards container
 * @param {*} member
 */
const addMemberCard = member => {
    const { index, name, role, avatar } = member;

    let memberCard = deepClone(cardTemp);

    memberCard.id = memberCard.id.replace('MEMBER_INDEX', index);
    memberCard.innerHTML = memberCard.innerHTML.replace('MEMBER_NAME', name);
    memberCard.innerHTML = memberCard.innerHTML.replace('MEMBER_ROLE', role);
    memberCard.querySelector('img').src = getAvatarFilename(avatar);

    cardsContainer.appendChild(memberCard);
}

/**
 * Clone html element with all its children and grandchildren
 * @param {*} element html element needed to be cloned
 * @returns the clone of the element
 */
const deepClone = element => {
    let elementClone = element.cloneNode();

    element.childNodes.forEach(node => {
        elementClone.append(deepClone(node));
    })
    return elementClone;
}

/**
 * Get img path from the avatar key
 * @param {string} avatar key implies to specific avatar option
 * @returns avatar image file path
 */
const getAvatarFilename = avatar => {
    let imgsDir = 'images/';

    switch (avatar) {
        case 'batman':
            return imgsDir + 'avatar-batman.png';
        case 'male-1':
            return imgsDir + 'avatar-male1.png';
        case 'male-2':
            return imgsDir + 'avatar-male2.png';
        case 'male-3':
            return imgsDir + 'avatar-male3.png';
        case 'male-4':
            return imgsDir + 'avatar-male4.png';
        case 'female-1':
            return imgsDir + 'avatar-female1.png';
        case 'female-2':
            return imgsDir + 'avatar-female2.png';
    }
}