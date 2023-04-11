describe('Video Chat page', () => {
    it('Video chat page successfully loads', () => {
        cy.visit('/video-chat')
    }),
        it("Start webcam", () => {
            cy.visit('/video-chat'),
                cy.get("#startWebcam").click()
        }),
        it("Toggle video off", () => {
            cy.visit('/video-chat'),
                cy.get("#startWebcam").click(),
                cy.get(".video").click()
        }),
        it("Toggle video back on", () => {
            cy.visit('/video-chat'),
                cy.get("#startWebcam").click(),
                cy.get(".video").click(),
                cy.get(".video").click()
        })
        it("Toggle audio off", () => {
            cy.visit('/video-chat'),
                cy.get("#startWebcam").click(),
                cy.get(".audio").click()
        }),
        it("Toggle video back on", () => {
            cy.visit('/video-chat'),
                cy.get("#startWebcam").click(),
                cy.get(".audio").click(),
                cy.get(".audio").click()
        })
})