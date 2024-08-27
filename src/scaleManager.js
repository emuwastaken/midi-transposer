class ScaleManager {
    constructor() {
        this.sourceScale = [];
        this.targetScale = [];
        this.transformationMatrix = {};
    }

    setSourceScale(scale) {
        this.sourceScale = scale;
        this.updateTransformationMatrix();
    }

    setTargetScale(scale) {
        this.targetScale = scale;
        this.updateTransformationMatrix();
    }

    updateTransformationMatrix() {
        if (this.sourceScale.length > 0 && this.targetScale.length > 0) {
            this.transformationMatrix = this.createTransformationMatrix();
        }
    }

    createTransformationMatrix() {
        const matrix = {};
        this.sourceScale.forEach((note, index) => {
            matrix[note] = this.targetScale[index];
        });
        return matrix;
    }

    getTransformationMatrix() {
        return this.transformationMatrix;
    }
}

module.exports = ScaleManager;
