import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface SlideItem {
    id: string;
    ask: string;
}

interface QuestionaireItem {
    id: string;
    title: string | null
}

export const cleanup = async () => {
    //DELETE SLIDES
    //Get all the slides from the db
    //filter down the ones that begin with '[TEST]'
    //Delete all

    //DELETE QUESTIONAIRES
    //Run after the first promise is resolved, DELETE QUESTIONAIRES
    //Get all the questionaires form the db
    //filter down the ones that begin with '[TEST]'
    //Delete all

    const allSlides = await prisma.slides.findMany({
        select: {
            id: true,
            ask: true
        }
    });
    const slidesToDel: SlideItem[] = [];
    const slidesToDelIds: Array<string> = [];
    allSlides.map((item) => {
        if((item.ask).includes('[TEST]')){
            slidesToDel.push(item);
            slidesToDelIds.push(item.id);
        }
    });

    if(slidesToDelIds.length > 0){
        const delSlides = await prisma.slides.deleteMany({
            where: {
                id: {
                    in: slidesToDelIds
                }
            }
        });
        console.log("delSlides", delSlides);
    } else {
        console.log("No slides to delete", slidesToDel);
    }


    setTimeout(() => {
        console.log("Waited for 5s for the slides to be deleted");
    }, 5000);

    const allQuestionaires = await prisma.questionaire.findMany({
        select: {
            id: true,
            title: true
        }
    });

    const questsToDel: QuestionaireItem[] = [];
    const questsToDelIds: Array<string> = [];

    allQuestionaires.map((item) => {
        if(item && item.title && (item.title).includes('[TEST]')){
            questsToDel.push(item);
            questsToDelIds.push(item.id);
        }
    });

    if(questsToDelIds.length > 0){
        const delQuests = await prisma.questionaire.deleteMany({
            where: {
                id: {
                    in: questsToDelIds
                }
            }
        });
        console.log("delQuests", delQuests);
    } else {
        console.log("No quests to delete!", questsToDel);
    }

}